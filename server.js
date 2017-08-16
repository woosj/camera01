'use strict';
/*
*   사진 및 센서 정보를 하여 서버로 전송
*
*   1. 카메라기능
*   2. 센싱 기능
*   3. MQTT 사용자 명령 확인
*  
*/
var camera = require("./camera/photo"); //사진 촬영 모듈
var SerialPort = require('serialport');
var port = new SerialPort('/dev/ttyACM0',{
baudrate: 9600,
parser: SerialPort.parsers.readline('\n')
});
 
port.on('open', function() {
    console.log('1 written');
});
 
// open errors will be emitted as an error event
port.on('error', function(err) {
  console.log('Error: ', err.message);
})
 
port.on('data', function (data) {
  console.log('Read and Send Data : ' + data);
  port.write(data);
});


camera.start(); //카메라 모듈 실행