import mysql.connector
from threading import Timer, Lock
from time import sleep
import signal
import sys
import sensor_touch

import board
import adafruit_dht
from time import sleep
import RPi.GPIO as GPIO
import datetime

from gpiozero import DistanceSensor

def closeDB(signal, frame):
    print("BYE")
    cur.close()
    db.close()
    timer.cancel()
    sys.exit(0)


def sensing():
    global db, cur, dhtDevice, temperature_c, humidity, closeness

    try:
        temperature_c = dhtDevice.temperature
        humidity = dhtDevice.humidity

    except RuntimeError as error:
        a = 1 # dummy

    gas = GPIO.input(gas_pin)

    time = str(datetime.datetime.now().strftime('%Y-%m-%d   %I:%M:%S'))
    battery = 1
    closeness = sensor_touch.closeness

    msg = "Temp : " + str(temperature_c) + "  Humid : " + str(humidity) + " Gas : " + str(gas)
    print(msg)
    
    query1 = "insert into bobi_sensor(gas, temperature, humidity, datetime, battery) values (%s, %s, %s, %s, %s)"
    value1 = (gas, temperature_c, humidity, time, battery)

    lock.acquire()
    cur.execute(query1, value1)
    db.commit()
    lock.release()

    query2 = "insert into bobi_robot(robot_id, exp) values (%s, %s)"
    value2 = (0, closeness)
    
    lock.acquire()
    cur.execute(query2, value2)
    db.commit()
    lock.release()

    global timer
    timer = Timer(60, sensing)
    timer.start()

def polling():
    global cur, db, temperature_c, humidity
    cur.execute("select * from bobi_sensor order by sensor_id desc limit 1")
    for (sensor_id,gas,temperature, humidity,datetime,battery,robot_id) in cur:
        temperature_c = temperature
        humidity = humidity

    db.commit()


# init
db = mysql.connector.connect(host='i7a208.p.ssafy.io', port = '3306', user='pjt_bobi', password='mysql989312bobi#', database='bobi', auth_plugin='mysql_native_password')
cur = db.cursor()

timer = None
closeness = 0

temperature_c = 0
humidity = 0

dhtDevice = adafruit_dht.DHT11(board.D18)
gas_pin = 17
GPIO.setmode(GPIO.BCM)
GPIO.setup(gas_pin, GPIO.IN)

#sensor = DistanceSensor(27,22)

lock = Lock()

polling()
signal.signal(signal.SIGINT, closeDB)
sensing()

'''
while True:
    print(sensor.distance, "m")
    print("exp : " + str(closeness))
    sleep(3)
'''
