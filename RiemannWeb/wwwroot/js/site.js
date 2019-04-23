// Function modified from https://github.com/daneden/animate.css
function animateCSS(node, animationName, isPermanent, callback) {
    node.classList.add("animated", animationName);

    function handleAnimationEnd() {
        if (!isPermanent)
            node.classList.remove("animated", animationName);
        node.removeEventListener("animationend", handleAnimationEnd);

        if (typeof callback === "function") callback();
    }

    node.addEventListener("animationend", handleAnimationEnd);
}

document.addEventListener("DOMContentLoaded", function () {
    var features = document.getElementsByClassName("feature");

    cycle = 0;
    var timer = setInterval(function () {
        animateCSS(features[cycle], "fadeInLeft", true, null);
        cycle += 1;
        if (cycle === features.length) clearInterval(timer);
    }, 150);

    setTimeout(function () {
        animateCSS(document.querySelector(".right"), "fadeIn", true, null);
        animateCSS(document.querySelector("#start-button"), "fadeInDown", true, null);
    }, features.length * 150);
});