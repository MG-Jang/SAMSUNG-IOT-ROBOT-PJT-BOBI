#!/usr/bin/env/python3
# File name   : robo_testt.py
# Description : Test file form robot interfaces without robot
import time
import json

def forward(speed=100):
	print('\nrobot-forward\n')

def backward(speed=100):
	print('\nrobot-backward\n')

def left(speed=100):
	print('\nrobot-left\n')

def right(speed=100):
	print('\nrobot-right\n')

def stopLR():
	print('\nrobot-stop\n')

def stopFB():
	print('\nrobot-stop\n')

def lookUp():
	print('\nrobot-lookUp\n')

def lookDown():
	print('\nrobot-lookDown\n')

def lookStopUD():
	print('\nrobot-lookStopUD\n')

def lookLeft():
	print('\nrobot-lookLeft\n')

def lookRight():
	print('\nrobot-lookRight\n')

def lookStopLR():
	print('\nrobot-lookStopLR\n')



def steadyMode():
	print('\nrobot-steady\n')

def jump():
	print('\nrobot-jump\n')

def handShake():
	print('\nrobot-handshake\n')
 
def sit():
	print('\nrobot-sit\n')

def standUp():
	print('\nrobot-standUp\n')

def leftHand():
	print('\nrobot-leftHand\n')

def rightHand():
	print('\nrobot-rightHand\n')

def lower():
	print('\nrobot-lower\n')

def upper():
	print('\nrobot-upper\n')









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


# if __name__ == '__main__':
#     # robotCtrl.moveStart(100, 'forward', 'no', 0)
#     # time.sleep(3)
#     # robotCtrl.moveStop()
#     while 1:
#         time.sleep(1)
#         pass