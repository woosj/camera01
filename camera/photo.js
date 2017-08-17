
var RaspiCam = require("raspicam"); //카메라 모듈

var camera = new RaspiCam({    
    width: 600,
    height: 420,
    mode: 'timelapse',
    awb: 'off',
    encoding: 'jpg',
    output: "images/image_%06d.jpg", // image_000001.jpg, image_000002.jpg,...
    q: 50,
    timeout: 0, // take a total of 4 pictures over 12 seconds , 0 일경우 무제한 촬영
    timelapse: 3000, // take a picture every 3 seconds
    nopreview: true,
    th: '0:0:0'
});

//모듈 시작
camera.on("start", function (err, timestamp) {
    console.log("timelapse started at " + timestamp);
});

//카메라 촬영
camera.on("read", function (err, timestamp, filename) {
    console.log("timelapse image captured with filename: " + filename);
});

//모듈 종료
camera.on("exit", function (timestamp) {
    console.log("timelapse child process has exited");
});

//모듈 정지
camera.on("stop", function (err, timestamp) {
    console.log("timelapse child process has been stopped at " + timestamp);
});

module.exports = camera;