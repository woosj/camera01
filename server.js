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
var arduino = require("./camera/arduino");

setInterval(camera.start, 1500);    //ī�޶� ��� ����