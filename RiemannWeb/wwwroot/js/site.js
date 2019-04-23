// Function modified from https://github.com/daneden/animate.css
function animateCSS(node, animationName, isPermanent, callback) {
    node.classList.add("animated", animationName);

    function handleAnimationEnd() {
        if (!isPermanent) {
            node.classList.remove("animated", animationName);
        }

        node.removeEventListener("animationend", handleAnimationEnd);

        if (typeof callback === "function") callback();
    }

    node.addEventListener("animationend", handleAnimationEnd);
}

document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname === "/")
        transitionInHome();
});

function transitionInHome() {
    var features = document.getElementsByClassName("feature");

    cycle = 0;
    var timer = setInterval(function () {
        animateCSS(features[cycle], "fadeInLeft", false, null);
        features[cycle].style.opacity = 1;
        cycle += 1;
        if (cycle === features.length) clearInterval(timer);
    }, 150);

    setTimeout(function () {
        animateCSS(document.querySelector(".right"), "fadeIn", true, null);
        animateCSS(document.querySelector("#start-button"), "fadeInDown", true, null);
    }, features.length * 150);

}

function transitionOut(url) {
    if (window.location.pathname === "/")
        transitionOutHome(url);
    else {
        animateCSS(document.body, "fadeOut", true, null);
        animateCSS(document.querySelector(".navbar"), "fadeOutUp", true, null);
        animateCSS(document.querySelector("footer"), "fadeOutDown", true, null);
        window.location.assign(url);
    }
}

function transitionOutHome(url) {
    animateCSS(document.querySelector("#start-button"), "fadeOutDown", true, null);
    animateCSS(document.querySelector(".right"), "fadeOut", true, null);

    var features = document.getElementsByClassName("feature");

    cycle = 0;
    var timer = setInterval(function () {
        animateCSS(features[cycle], "fadeOutLeft", true, null);
        cycle += 1;
        if (cycle === features.length) {
            clearInterval(timer);
            animateCSS(document.querySelector(".navbar"), "fadeOutUp", true, null);
            animateCSS(document.querySelector("footer"), "fadeOutDown", true, null);
            window.location.assign(url);
        }
    }, 150);
}