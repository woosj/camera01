
var five = require("johnny-five");

board.on("ready", function () {

    var analog = new five.Pin("A0");

    // Query the analog pin for its current state.
    analog.query(function (state) {
        console.log(state);
    });
});

/*var SerialPort = require('serialport'); //아두이노와 시리얼 통신할 수 있는 모듈

//라즈베리파이와 연결된 디바이스 주소
var port = new SerialPort('/dev/ttyACM0', {
    baudrate: 9600,
    parser: SerialPort.parsers.readline('\n')
});

//포트 열기
port.on('open', function () {
    console.log('1 written');
});

// open errors will be emitted as an error event
port.on('error', function (err) {
    console.log('Error: ', err.message);
})

//데이터 가져오기
port.on('data', function (data) {
    console.log('Read and Send Data : ' + data);
    port.write(data);
});

module.exports = port;
*/