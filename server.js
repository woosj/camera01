'use strict';
/*
*   사진 및 센서 정보를 하여 서버로 전송
*
*   1. 카메라기능
*   2. 센싱 기능
*   3. MQTT 사용자 명령 확인
*
*/

//var camera = require("./camera/photo2"); //사진 촬영 모듈
var arduino = require("./camera/arduino");

var fs = require('fs'); //file system
var path = require('path'); //경로 설정 모듈
var spawn = require('child_process').spawn; //카메라 모듈 제어
var socket = require('socket.io-client')('http://192.168.0.34:5001');   //소켓서버에 연결
var dl = require('delivery');   //파일 전송 모듈
var moment = require('moment');

var intervalObj;
var process;
var isStreaming = false;

var config = {
    "channel": "test1",
    "capture-rate": 200,
    "capture-time": 100,
    "image-path": "images",
    "image-name": "_image.jpg",
    "image-width": 640,
    "image-height": 480

}
var path_name = "";

//사진 챕쳐 시작
function startStreaming() {
    console.log('Starting stream.');
    isStreaming = true;
    intervalObj = setInterval(takeImage, config['capture-rate']);
}

//사진 캡쳐 종료
function stopStreaming() {
    console.log('Stopping stream.');
    isStreaming = false;
    if (process) {
        process.kill();
    }
    clearInterval(intervalObj);
}


function takeImage() {
    //console.log('taking image');
    path_name = getAbsoluteImagePath();
    var args = [
        '-w', config['image-width'],   // width
        '-h', config['image-height'],  // height
        '-t', config['capture-rate'],  // how long should taking the picture take?
        '-o', path_name   // path + name
    ];
    process = spawn('raspistill', args);
    process.on('exit', sendImage);
}

function sendImage(path_name) {

    //소켓통신으로 이미지 파일을 서버로 전송
    socket.on('connect', function () {
        console.log("Sockets connected");
        //delivery 패키지 이용
        delivery = dl.listen(socket);
        delivery.connect();

        delivery.on('delivery.connect', function (delivery) {

            delivery.send({
                name: path_namee,
                path: path_namee,
                params: { channel: 'test1' }
            });

            delivery.on('send.success', function (file) {
                console.log('File sent successfully!');
            });
        });

    });
}

function getAbsoluteImagePath() {
    /*
    *   예: /images/test1/201705/image.jpg
    *
    *
    */
    var image_file_date = moment().format('YYYYMMDDHHmmss') + config['image-name'];
    var date_folder = moment().format('YYYYMMDD');

    //채널별로 폴더 유무 체크
    fs.exists('./images/' + config['channel'], function (exists) {

        if (!exists) {  //없을 경우 폴더 생성

            fs.mkdir('./images/' + config['channel'], '0777', function (err) {
                if (err) throw err;
                console.log('dir writed');
            });

        } else {



            //월별 폴더 유무 체크
            fs.exists('./images/' + config['channel'], function (exists) {
                if (!exists) {
                    fs.mkdir('./images/' + config['channel'] + "/" + date_folder, '0777', function (err) {
                        if (err) throw err;
                        console.log('dir writed');
                    });
                }
            });
        }
    });

    return path.join(__dirname, config['image-path'], config['channel'], date_folder, image_file_date);
}

startStreaming();