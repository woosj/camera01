var RaspiCam = require("raspicam");

var camera = new RaspiCam({    
    width: 600,
    height: 420,
    mode: 'timelapse',
    awb: 'off',
    encoding: 'jpg',
    output: "images/image_%06d.jpg", // image_000001.jpg, image_000002.jpg,...
    q: 50,
    timeout: 0, // take a total of 4 pictures over 12 seconds
    timelapse: 3000, // take a picture every 3 seconds
    nopreview: true,
    th: '0:0:0'
});

camera.on("start", function (err, timestamp) {
    console.log("timelapse started at " + timestamp);
});

camera.on("read", function (err, timestamp, filename) {
    console.log("timelapse image captured with filename: " + filename);
});

camera.on("exit", function (timestamp) {
    console.log("timelapse child process has exited");
});

camera.on("stop", function (err, timestamp) {
    console.log("timelapse child process has been stopped at " + timestamp);
});

module.exports = camera;