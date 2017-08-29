
var SerialPort = require('serialport'); //아두이노와 시리얼 통신할 수 있는 모듈
var mqtt = require('mqtt'); //mqtt 모듈
var client = mqtt.connect('mqtt://13.124.28.87');  //mqtt 서버 접속

var parsers = SerialPort.parsers;
var parser = new parsers.Readline({
    delimiter: '\r\n'
});

var http = require('http');

//라즈베리파이와 연결된 디바이스 주소
var port = new SerialPort('/dev/ttyACM0', {
    baudrate: 9600
});

port.pipe(parser);


//MQTT pub/sub
client.on('connect', function () {
    client.subscribe('/1/onoff');
})

//callback
client.on('message', function (topic, message) {
    // message is Buffer 
    console.log(message.toString());
})

//포트 열기
port.on('open', function () {
    console.log('1 written');
});

// open errors will be emitted as an error event
port.on('error', function (err) {
    console.log('Error: ', err.message);
});

parser.on('data', function (data) {
    console.log('Read and Send Data : ' + data);

    var sensorObj = JSON.parse(data.toString()); // json 형식 data를 객체형식으로 저장

    http.get('http://192.168.0.34:8080/test/insert?field=1&value=' + sensorObj.soil, (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            //console.log(JSON.parse(data).explanation);
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
});

module.exports = port;