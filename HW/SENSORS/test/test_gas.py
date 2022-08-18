import RPi.GPIO as GPIO
import time

gas_pin = 17 # DO에 연결된 핀 번호에 맞추기

GPIO.setmode(GPIO.BCM)
GPIO.setup(gas_pin, GPIO.IN)

try:
    while True:
        a = GPIO.input(gas_pin)
        print(a) # 가스 검출 시 0 검출 x 1
        time.sleep(1)

except KeyboardInterrupt:
    GPIO.cleanup()