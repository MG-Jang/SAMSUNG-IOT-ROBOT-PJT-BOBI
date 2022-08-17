from threading import Timer,Lock    
import mysql.connector
import go_oled
from time import sleep
import RPi.GPIO as GPIO

def up():
    global closeness, timer
 
    dotouch = GPIO.input(tilt_pin)  # 터치 누르면 1 안누르면 0 출력
    if dotouch :   
        closeness += 10
        go_oled.state = 'heart'
        sleep(3)
        go_oled.state= 'always'
        sleep(10)

    timer = Timer(0.1, up)
    timer.start()

def polling():
    global cur, db, closeness
    lock.acquire()  
    cur.execute("select * from bobi_robot order by robot_id desc limit 1")
    for (robot_id, exp, level) in cur:
        closeness = exp 

    db.commit()
    lock.release()
    cur.close()
    db.close()

db = mysql.connector.connect(host='i7a208.p.ssafy.io', port = '3306', user='pjt_bobi', password='mysql989312bobi#', database='bobi', auth_plugin='mysql_native_password')
cur = db.cursor()
lock = Lock()
closeness = 0
tilt_pin = 4 #터치 센서의 경우 센서만 바꾸면 됨
GPIO.setmode(GPIO.BCM)
GPIO.setup(tilt_pin, GPIO.IN)

polling()
up()

    
     
            
        
   
     
            
        
