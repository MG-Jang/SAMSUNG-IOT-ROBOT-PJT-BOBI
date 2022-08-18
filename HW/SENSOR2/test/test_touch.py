import RPi.GPIO as GPIO
import time

tilt_pin = 4 #터치 센서의 경우 센서만 바꾸면 됨

GPIO.setmode(GPIO.BCM)
GPIO.setup(tilt_pin, GPIO.IN)

try:
    while True:
        a = GPIO.input(tilt_pin)
        print(a) # 터치 누르면 1 안누르면 0 출력
        time.sleep(1)

except KeyboardInterrupt:
    GPIO.cleanup()