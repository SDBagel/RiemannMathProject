var video = null;
var canvas = null;
var snapButton = null;
var errorMsgElement = null;
var helpMenu = null;

var ctx;
var mouseX, mouseY, mouseDown = 0;
var touchX, touchY;

document.addEventListener("DOMContentLoaded", function () {
    video = document.getElementById("video");
    canvas = document.getElementById("canvas");
    snapButton = document.getElementById("snapButton");
    errorMsgElement = document.querySelector("span#errorMsg");
    helpMenu = document.querySelector("#help");

    init();

    canvas.height = innerHeight - 110;
    canvas.width = innerWidth;
    if (canvas.getContext)
        ctx = canvas.getContext("2d");

    // Check that we have a valid context to draw on/with before adding event handlers
    if (ctx) {
        // React to mouse events on the canvas, and mouseup on the entire document
        canvas.addEventListener('mousedown', sketchpad_mouseDown, false);
        canvas.addEventListener('mousemove', sketchpad_mouseMove, false);
        window.addEventListener('mouseup', sketchpad_mouseUp, false);

        // React to touch events on the canvas
        canvas.addEventListener('touchstart', sketchpad_touchStart, false);
        canvas.addEventListener('touchmove', sketchpad_touchMove, false);
    }
});

const constraints = {
    video: {
        width: innerWidth, height: innerHeight
    }
};

function onMobile() {
    if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
    ) {
        return true;
    }
    else {
        return false;
    }
}

async function init() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        window.stream = stream;
        video.srcObject = stream;
    } catch (e) {
        errorMsgElement.style.display = "block";
        if (onMobile()) {
            errorMsgElement.innerHTML = "Welcome to RiemannWeb! To get started, click the \"Upload\" button to take a photo.";
        }
        else {
            errorMsgElement.innerHTML = "Uh oh, an error has occured starting a live video feed! Please upload an image instead.";
        }
        snapButton.style.display = "none";
    }
}

function snap() {
    video.pause();
    snapButton.onclick = retake;
    snapButton.value = "Retake";
    canvas.style.display = "block";
}

function retake() {
    video.play();
    snapButton.onclick = snap;
    snapButton.value = "Capture";
    canvas.style.display = "none";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function helpToggle() {
    if (helpMenu.style.display === "block") {
        helpMenu.style.display = "none";
    }
    else {
        helpMenu.style.display = "block";
    }
}

function drawDot(ctx, x, y, size) {
    r = 0; g = 0; b = 0; a = 150;
    ctx.fillStyle = "rgba(" + r + "," + g + "," + b + "," + (a / 255) + ")";

    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
}

function sketchpad_mouseDown() {
    mouseDown = 1;
    drawDot(ctx, mouseX, mouseY, 8);
}

function sketchpad_mouseUp() {
    mouseDown = 0;
}

function sketchpad_mouseMove(e) {
    getMousePos(e);

    if (mouseDown === 1) {
        drawDot(ctx, mouseX, mouseY, 8);
    }
}

function getMousePos(e) {
    if (!e)
        e = event;

    if (e.offsetX) {
        mouseX = e.offsetX;
        mouseY = e.offsetY;
    }
    else if (e.layerX) {
        mouseX = e.layerX;
        mouseY = e.layerY;
    }
}

function sketchpad_touchStart() {
    getTouchPos();
    drawDot(ctx, touchX, touchY, 8);
    event.preventDefault();
}

function sketchpad_touchMove(e) {
    getTouchPos(e);
    drawDot(ctx, touchX, touchY, 8);
    event.preventDefault();
}

function getTouchPos(e) {
    if (!e)
        e = event;

    if (e.touches) {
        if (e.touches.length === 1) { // Only deal with one finger
            var touch = e.touches[0]; // Get the information for finger #1
            touchX = touch.pageX;
            touchY = touch.pageY;
        }
    }
}