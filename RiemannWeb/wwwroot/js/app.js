var video, canvas, file, snapButton;
var errorMsgElement, helpMenu = null;

var ctx;
var mouseX, mouseY, mouseDown = 0;
var touchX, touchY;

var points = [];
var equation = [];

// Returns either 55 or 105 depending on screen width
// For fixing input
function getOffset() {
    if (innerHeight < 600 || innerWidth < 1000) {
        return 105;
    }
    else {
        return 55;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    video = document.getElementById("video");
    canvas = document.getElementById("canvas");
    file = document.getElementById("file");
    snapButton = document.getElementById("snapButton");

    errorMsgElement = document.querySelector("span#errorMsg");
    helpMenu = document.querySelector("#help");

    init();

    file.onchange = preview;

    canvas.width = innerWidth;
    canvas.height = innerHeight - getOffset();

    // Attach event handlers for canvas
    if (canvas.getContext)
        ctx = canvas.getContext("2d");
    if (ctx) {
        canvas.addEventListener('mousedown', sketchpad_mouseDown, false);
        canvas.addEventListener('mousemove', sketchpad_mouseMove, false);
        window.addEventListener('mouseup', sketchpad_mouseUp, false);

        canvas.addEventListener('touchstart', sketchpad_touchStart, false);
        canvas.addEventListener('touchend', sketchpad_touchEnd, false);
        canvas.addEventListener('touchmove', sketchpad_touchMove, false);
    }
});

// Check if on mobile device
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

// Start live image feed or set error
async function init() {
    const constraints = {
        video: {
            width: innerWidth, height: innerHeight
        }
    };

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

// Freezes video and enables canvas editing
function snap() {
    video.pause();
    snapButton.onclick = retake;
    snapButton.value = "Retake";
    canvas.style.display = "block";
}

// Unfreezes video, clears canvas, disables editing
function retake() {
    video.play();
    snapButton.onclick = snap;
    snapButton.value = "Capture";
    document.getElementById("editor").innerHTML = "";
    document.getElementById("calculate").style.display = "none";
    canvas.style.display = "none";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Display a image from upload button
function preview() {
    var reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById("upload").src = e.target.result;
    };
    reader.readAsDataURL(this.files[0]);

    canvas.style.display = "block";
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    video.style.display = "none";
    snapButton.value = "Use Camera";
    snapButton.onclick = clearPreview;
}

// Clear the image preview
function clearPreview() {
    video.style.display = "block";
    document.getElementById("upload").src = "";

    document.getElementById("editor").innerHTML = "";

    canvas.style.display = "none";
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    snapButton.value = "Capture";
    snapButton.onclick = snap;
}

// Toggle show help menu
function helpToggle() {
    if (helpMenu.style.display === "block") {
        animateCSS(helpMenu, "fadeOutRight", false, function () {
            helpMenu.style.display = "none";
        });
    }
    else {
        helpMenu.style.display = "block";
        animateCSS(helpMenu, "fadeInRight", false, null);
    }
}

// Accesses calculator.js to get data
function calculate() {

}

// Add equation to array, add removal button
function pushEquation() {
    //if equation isnt a misclick and drawing is enabled
    if (canvas.style.display === "block" && equation.length > 10) {
        points.push(equation);
        equation = [];

        var editor = document.getElementById("editor");
        editor.innerHTML +=
            "<img id=\"remove" + (points.length - 1) + "\" class=\"remove\" src=\"/img/remove.png\" onclick=\"removeEquation(" + (points.length - 1) + ")\" />";

        document.getElementById("calculate").style.display = "inline-block";

        console.log(points);
    }
    else {
        // Remove points from canvas
        for (var i = 0; i < equation.length; i++) {
            ctx.clearRect(equation[i][0] - 8, equation[i][1] - 8, 16, 16);
        }
        equation = [];
    }
}

// Remove an equation from the list - called by user
function removeEquation(index) {
    var equation = points[index];
    points[index] = null;

    // Remove points from canvas
    for (var i = 0; i < equation.length; i++) {
        ctx.clearRect(equation[i][0] - 8, equation[i][1] - 8, 16, 16);
    }

    document.querySelector("#remove" + index).remove();

    if (document.getElementById("editor").childElementCount === 0) {
        document.getElementById("calculate").style.display = "none";
    }
}

// Draws a dot on canvas and adds to equation
function drawDot(ctx, x, y, size) {
    r = 50; g = 50; b = 50; a = 150;
    ctx.fillStyle = "rgba(" + r + "," + g + "," + b + "," + a / 255 + ")";

    // Adds new point to the equation
    equation.push(new Array(x, y));

    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
}

// Sketchpad mouse functions
function sketchpad_mouseDown() {
    mouseDown = 1;
    drawDot(ctx, mouseX, mouseY, 8);
}

function sketchpad_mouseUp() {
    mouseDown = 0;

    pushEquation();
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

    mouseX = e.layerX;
    mouseY = e.layerY;
}

// Sketchpad touch functions
function sketchpad_touchStart() {
    getTouchPos();
    drawDot(ctx, touchX, touchY, 8);
    event.preventDefault();
}

function sketchpad_touchEnd() {
    pushEquation();
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
        if (e.touches.length === 1) {
            var touch = e.touches[0];

            touchX = touch.pageX;
            touchY = touch.pageY - getOffset();
        }
    }
}