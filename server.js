'use strict';
/*
*   ���� �� ���� ������ �Ͽ� ������ ����
*
*   1. ī�޶���
*   2. ���� ���
*   3. MQTT ����� ��� Ȯ��
*
*/

var camera = require("./camera/photo2"); //���� �Կ� ���
var arduino = require("./camera/arduino");


camera.start();
