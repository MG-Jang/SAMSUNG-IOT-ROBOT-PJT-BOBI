#!/usr/bin/env/python3
# File name   : robot.py
# Description : Robot interfaces..........
import time
import json
import serial

ser = serial.Serial("/dev/ttyS0",115200)
dataCMD = json.dumps({'var':"", 'val':0, 'ip':""})
upperGlobalIP = 'UPPER IP'


pitch, roll = 0, 0


def setUpperIP(ipInput):
	global upperGlobalIP
	upperGlobalIP = ipInput

def forward(speed=100):
	dataCMD = json.dumps({'var':"move", 'val':1})
	ser.write(dataCMD.encode())
	print('robot-forward')

def backward(speed=100):
	dataCMD = json.dumps({'var':"move", 'val':5})
	ser.write(dataCMD.encode())
	print('robot-backward')

def left(speed=100):
	dataCMD = json.dumps({'var':"move", 'val':2})
	ser.write(dataCMD.encode())
	print('robot-left')

def right(speed=100):
	dataCMD = json.dumps({'var':"move", 'val':4})
	ser.write(dataCMD.encode())
	print('robot-right')

def stopLR():
	dataCMD = json.dumps({'var':"move", 'val':6})
	ser.write(dataCMD.encode())
	print('robot-stop')

def stopFB():
	dataCMD = json.dumps({'var':"move", 'val':3})
	ser.write(dataCMD.encode())
	print('robot-stop')



def lookUp():
	dataCMD = json.dumps({'var':"ges", 'val':1})
	ser.write(dataCMD.encode())
	print('robot-lookUp')

def lookDown():
	dataCMD = json.dumps({'var':"ges", 'val':2})
	ser.write(dataCMD.encode())
	print('robot-lookDown')

def lookStopUD():
	dataCMD = json.dumps({'var':"ges", 'val':3})
	ser.write(dataCMD.encode())
	print('robot-lookStopUD')

def lookLeft():
	dataCMD = json.dumps({'var':"ges", 'val':4})
	ser.write(dataCMD.encode())
	print('robot-lookLeft')

def lookRight():
	dataCMD = json.dumps({'var':"ges", 'val':5})
	ser.write(dataCMD.encode())
	print('robot-lookRight')

def lookStopLR():
	dataCMD = json.dumps({'var':"ges", 'val':6})
	ser.write(dataCMD.encode())
	print('robot-lookStopLR')

def lookFront():
	dataCMD = json.dumps({'var':"ges", 'val':7})
	ser.write(dataCMD.encode())
	print('robot-lookFront')


def steadyMode():
	dataCMD = json.dumps({'var':"funcMode", 'val':1})
	ser.write(dataCMD.encode())
	print('robot-steady')

def jump():
	dataCMD = json.dumps({'var':"funcMode", 'val':4})
	ser.write(dataCMD.encode())
	print('robot-jump')

def handShake():
	dataCMD = json.dumps({'var':"funcMode", 'val':3})
	ser.write(dataCMD.encode())
	print('robot-handshake')

def stayLow():
	dataCMD = json.dumps({'var':"funcMode", 'val':2})
	ser.write(dataCMD.encode())
	print('robot-staylow')
	
def sit():
	dataCMD = json.dumps({'var':"funcMode", 'val':10})
	ser.write(dataCMD.encode())
	print('robot-sit')

def standUp():
	dataCMD = json.dumps({'var':"funcMode", 'val':11})
	ser.write(dataCMD.encode())
	print('robot-standup')

def leftHand():
	dataCMD = json.dumps({'var':"funcMode", 'val':12})
	ser.write(dataCMD.encode())
	print('robot-lefthand')
	
def rightHand():
	dataCMD = json.dumps({'var':"funcMode", 'val':13})
	ser.write(dataCMD.encode())
	print('robot-righthand')

def lower():
	dataCMD = json.dumps({'var':"funcMode", 'val':14})
	ser.write(dataCMD.encode())
	print('robot-lower')

def upper():
	dataCMD = json.dumps({'var':"funcMode", 'val':15})
	ser.write(dataCMD.encode())
	print('robot-upper')

def ok():
	lookFront()
	for i in range(0,3):
		lookDown()
		time.sleep(0.03)
	time.sleep(0.2)
#	for s in range(0,2):
	for u in range(0,6):
		lookUp()
		time.sleep(0.03)
	time.sleep(0.1)
	for d in range(0,4):
		lookDown()
		time.sleep(0.03)
	time.sleep(0.1)
#	for o in range(0,3):
#		lookUp()
#		time.sleep(0.03)
	lookFront()
	print('robot-ok')
 
def dance():
	for i in range(1,7):
		lookLeft()
	time.sleep(0.3)
	for shakeTimes in range(1,7):
		for r in range(1,14):
			lookRight()
		time.sleep(0.3)
		for l in range(1,14):
			lookLeft()
		time.sleep(0.3)
	for i in range(1, 7):
		lookRight()
	lookFront()
	print('robot-upper')


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
	dataCMD = json.dumps({'var':"light", 'val':colorNum})
	ser.write(dataCMD.encode())


def buzzerCtrl(buzzerCtrl, cmdInput):
	dataCMD = json.dumps({'var':"buzzer", 'val':buzzerCtrl})
	ser.write(dataCMD.encode())



if __name__ == '__main__':
    # robotCtrl.moveStart(100, 'forward', 'no', 0)
    # time.sleep(3)
    # robotCtrl.moveStop()
    while 1:
        time.sleep(1)
        pass
