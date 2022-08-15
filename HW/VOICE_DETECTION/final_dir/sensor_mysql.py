import mysql.connector
from threading import Timer, Lock
from time import sleep
import signal
import sys
import go_oled

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

def up():
    global closeness, timer
    
    dotouch = GPIO.input(tilt_pin)  # 터치 누르면 1 안누르면 0 출력
    if dotouch : 
        closeness += 10
        go_oled.state = 'heart'
        sleep(3)
        go_oled.state= 'always'
        sleep(10)

    timer2 = Timer(0.1, up)
    timer2.start()

def polling():
    global cur, db, closeness 
    cur.execute("select * from bobi_robot order by robot_id desc limit 1")
    for (robot_id, exp, level) in cur:
        closeness = exp 

    db.commit()



# init
db = mysql.connector.connect(host='i7a208.p.ssafy.io', port = '3306', user='pjt_bobi', password='mysql989312bobi#', database='bobi', auth_plugin='mysql_native_password')
cur = db.cursor()

lock = Lock()

timer = None
timer2 = None
closeness = 0

dhtDevice = adafruit_dht.DHT11(board.D18)

GPIO.setmode(GPIO.BCM)
gas_pin = 17
GPIO.setup(gas_pin, GPIO.IN)

tilt_pin = 4 #터치 센서의 경우 센서만 바꾸면 됨
GPIO.setup(tilt_pin, GPIO.IN)

#sensor = DistanceSensor(27,22)

signal.signal(signal.SIGINT, closeDB)

polling()
up()
sensing()

'''
while True:
    print(sensor.distance, "m")
    print("exp : " + str(closeness))
    sleep(3)
'''
