﻿
var SerialPort = require('serialport'); //아두이노와 시리얼 통신할 수 있는 모듈
var parsers = SerialPort.parsers;
var parser = new parsers.Readline({
    delimiter: '\r\n'
});

var http = require('http');
var options = {
    host: '127.0.0.1',
    path: '/testing/insert/data/test1/',
    port: '8080',
    method: 'POST'
};

function readJSONResponse(response) {
    var responseData = "";
    response.on('data', function (chunk) {
        responseData += chunk;
    });
    response.on('end', function () {
        var dataObj = JSON.parse(responseData);
        console.log("Raw Response: " + responseData);
        console.log("Message: " + dataObj.message);
        console.log("Question: " + dataObj.question);
    });
}

port.pipe(parser);

//라즈베리파이와 연결된 디바이스 주소
var port = new SerialPort('/dev/ttyACM0', {
    baudrate: 9600
});

//포트 열기
port.on('open', function () {
    console.log('1 written');
});

// open errors will be emitted as an error event
port.on('error', function (err) {
    console.log('Error: ', err.message);
});

// Read data that is available but keep the stream from entering "flowing mode"
port.on('readable', function () {
    console.log('Data:', port.read());
});

//데이터 가져오기
port.on('data', function (data) {
    console.log('Read and Send Data : ' + data);

    //var req = http.request(options, readJSONResponse);
    //req.write('{"name":"Bilbo,", "occupation":"Burglar"}');
    //req.end();
    //port.write(data);
});

//parser.on('data', console.log);


module.exports = port;