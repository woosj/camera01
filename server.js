'use strict';
/*
*   ���� �� ���� ������ �Ͽ� ������ ����
*
*   1. ī�޶���
*   2. ���� ���
*   3. MQTT ����� ��� Ȯ��
*  
*/
var camera = require("./camera/photo"); //���� �Կ� ���
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


camera.start(); //ī�޶� ��� ����