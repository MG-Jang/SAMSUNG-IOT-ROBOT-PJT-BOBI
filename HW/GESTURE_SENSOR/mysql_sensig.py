import mysql.connector
from threading import Timer, Lock
from time import sleep
import signal
import sys
import os
import logging
import traceback
import oled_touch
logging.basicConfig(level=logging.DEBUG)

import time
import board
import adafruit_dht
from time import sleep
import RPi.GPIO as GPIO
import datetime

def closeDB(signal, frame):
    print("BYE")
    cur.close()
    db.close()
    timer.cancel()
    sys.exit(0)


def sensing():
    global db,cur, dhtDevice, temperature_c, humidity, closeness

    try:
        temperature_c = dhtDevice.temperature
        humidity = dhtDevice.humidity

    except RuntimeError as error:
        a = 1 # dummy

    gas = GPIO.input(gas_pin)

    time = str(datetime.datetime.now().strftime('%Y-%m-%d   %I:%M:%S'))
    battery = 1
    closeness = oled_touch.closeness

    msg = "Temp : " + str(temperature_c) + "  Humid : " + str(humidity) + " Gas : " + str(gas)
    print(msg)
    
    query = "insert into bobi_sensor(gas, temperature, humidity, datetime, battery) values (%s, %s, %s, %s, %s)"
    value = (gas, temperature_c, humidity, time, battery)

    lock.acquire()
    cur.execute(query, value)
    db.commit()
    lock.release()

    query = "insert into bobi_robot(robot_id, exp) values (%s, %s)"
    value = (0, closeness)
    
    lock.acquire()
    cur.execute(query, value)
    db.commit()
    lock.release()

    global timer
    timer = Timer(60, sensing)
    timer.start()

# init
db = mysql.connector.connect(host='[server ip]', port = '3306', user='pjt_bobi', password='[db pw]', database='bobi', auth_plugin='mysql_native_password')
cur = db.cursor()

timer = None
timer2 = None

dhtDevice = adafruit_dht.DHT11(board.D18)
gas_pin = 17
GPIO.setmode(GPIO.BCM)
GPIO.setup(gas_pin, GPIO.IN)

lock = Lock()

signal.signal(signal.SIGINT, closeDB)
sensing()



