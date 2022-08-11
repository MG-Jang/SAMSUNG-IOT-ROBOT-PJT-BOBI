"""
Testing code for MQTT subscribe

- publish test message for all topics
- usage
    - ./mqtt_subscribe_test_for_rpi -op1 [ip address of broker]

- Created by Dongwon Kim on 01 Aug, 2022
"""
from os import system
import argparse

def parse():
    parser = argparse.ArgumentParser(prog = "MQTT_TEST", description="Test sh for MQTT subscribe")
    parser.add_argument("-op1", type=str, dest="ip", action="store", help="MQTT broker server ip")
    
    args = parser.parse_args()
    return args

print("Starting paho publish testing in rpi...")
args = parse()

system('mosquitto_pub -h "' + args.ip  +  '" -t "testuser/move/forward" -m forward')
system('mosquitto_pub -h "' + args.ip  +  '" -t "testuser/move/backward" -m backward')
system('mosquitto_pub -h "' + args.ip  +  '" -t "testuser/move/left" -m left')
system('mosquitto_pub -h "' + args.ip  +  '" -t "testuser/move/right" -m right')
system('mosquitto_pub -h "' + args.ip  +  '" -t "testuser/voice/torobot" -m torobot')
system('mosquitto_pub -h "' + args.ip  +  '" -t "testuser/powersaving/on" -m poweron')
system('mosquitto_pub -h "' + args.ip  + '" -t "testuser/powersaving/off" -m poweroff')
system('mosquitto_pub -h "' + args.ip  + '" -t "testuser/gesture" -m sit')
system('mosquitto_pub -h "' + args.ip  + '" -t "testuser/gesture" -m standUp')
system('mosquitto_pub -h "' + args.ip  + '" -t "testuser/gesture" -m leftHand')
system('mosquitto_pub -h "' + args.ip  + '" -t "testuser/gesture" -m rightHand')
system('mosquitto_pub -h "' + args.ip  + '" -t "testuser/gesture" -m lower')
system('mosquitto_pub -h "' + args.ip  + '" -t "testuser/gesture" -m upper')
print("Test done")

