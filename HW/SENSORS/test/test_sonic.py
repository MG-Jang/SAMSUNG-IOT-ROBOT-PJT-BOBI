from gpiozero import DistanceSensor
from time import sleep

sensor = DistanceSensor(27,22) # Echo, Trig

while True:
    print(sensor.distance, "m")
    sleep(0.1)