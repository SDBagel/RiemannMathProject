document.addEventListener("DOMContentLoaded", function () {
    Webcam.set({
        width: innerWidth,
        height: innerHeight - 120,
        image_format: 'jpeg',
        jpeg_quality: 90
    });
    Webcam.attach("#camera");
});

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("camera").innerHTML = '<img src="' + data_uri + '"/>';
    });
}