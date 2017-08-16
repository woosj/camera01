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

camera.start(); //카메라 모듈 실행