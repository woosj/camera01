'use strict';
/*
*   ���� �� ���� ������ �Ͽ� ������ ����
*
*   1. ī�޶���
*   2. ���� ���
*   3. MQTT ����� ��� Ȯ��
*
*/

//var camera = require("./camera/photo2"); //���� �Կ� ���
var arduino = require("./camera/arduino");

var fs = require('fs'); //file system
var path = require('path'); //��� ���� ���
var spawn = require('child_process').spawn; //ī�޶� ��� ����
var socket = require('socket.io-client')('http://192.168.0.34:5001');   //���ϼ����� ����
var dl = require('delivery');   //���� ���� ���
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


//���� é�� ����
function startStreaming() {
    console.log('Starting stream.');
    isStreaming = true;
    intervalObj = setInterval(takeImage, config['capture-rate']);
}

//���� ĸ�� ����
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
    var path_name = getAbsoluteImagePath();
    var args = [
        '-w', config['image-width'],   // width
        '-h', config['image-height'],  // height
        '-t', config['capture-rate'],  // how long should taking the picture take?
        '-o', path_name   // path + name
    ];
    process = spawn('raspistill', args);
    process.on('exit', path_name, sendImage);
}

function sendImage(path_name) {

    //����������� �̹��� ������ ������ ����
    socket.on('connect', function () {
        console.log("Sockets connected");
        //delivery ��Ű�� �̿�
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
    *   ��: /images/test1/201705/image.jpg
    *
    *
    */
    var image_file_date = moment().format('YYYYMMDDHHmmss') + config['image-name'];
    var date_folder = moment().format('YYYYMMDD');

    //ä�κ��� ���� ���� üũ
    fs.exists('./images/' + config['channel'], function (exists) {

        if (!exists) {  //���� ��� ���� ����

            fs.mkdir('./images/' + config['channel'], '0777', function (err) {
                if (err) throw err;
                console.log('dir writed');
            });

        } else {



            //���� ���� ���� üũ
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