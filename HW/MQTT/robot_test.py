#!/usr/bin/env/python3
# File name   : robo_testt.py
# Description : Test file form robot interfaces without robot
import time
import json

def forward(speed=100):
	print('robot-forward')

def backward(speed=100):
	print('robot-backward')

def left(speed=100):
	print('robot-left')

def right(speed=100):
	print('robot-right')

def stopLR():
	print('robot-stop')

def stopFB():
	print('robot-stop')

def lookUp():
	print('robot-lookUp')

def lookDown():
	print('robot-lookDown')

def lookStopUD():
	print('robot-lookStopUD')

def lookLeft():
	print('robot-lookLeft')

def lookRight():
	print('robot-lookRight')

def lookStopLR():
	print('robot-lookStopLR')



def steadyMode():
	print('robot-steady')

def jump():
	print('robot-jump')

def handShake():
	print('robot-handshake')



def lightCtrl(colorName, cmdInput):
	colorNum = 0
	if colorName == 'off':
		colorNum = 0
	elif colorName == 'blue':
		colorNum = 1
	elif colorName == 'red':
		colorNum = 2
	elif colorName == 'green':
		colorNum = 3
	elif colorName == 'yellow':
		colorNum = 4
	elif colorName == 'cyan':
		colorNum = 5
	elif colorName == 'magenta':
		colorNum = 6
	elif colorName == 'cyber':
		colorNum = 7


if __name__ == '__main__':
    # robotCtrl.moveStart(100, 'forward', 'no', 0)
    # time.sleep(3)
    # robotCtrl.moveStop()
    while 1:
        time.sleep(1)
        pass