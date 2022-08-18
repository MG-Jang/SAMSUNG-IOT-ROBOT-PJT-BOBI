'''
# MQTT subscribe and map robot.py
# 
# Modification history
#   Created by Dongwon Kim on 04 Aug, 2022 
#   Modified by 곽다원 on 09 Aug, 2022
#       - parse payload and map robot
#   Modified by Dongwon kim
#       - refactoring
#
# arguements
#   - user_id: user id in DB as primary key
'''
import paho.mqtt.client as mqtt
import robot
from voice_s3_mssg import VoiceMessage
import argparse
import os

_mqtt_broker_ip = "i7a208.p.ssafy.io"

speedMove = 100

def parse_payload(payload):
    value = str(payload)
    return value[2:-1]
    

def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))

    # subscribe on predefined topics for robot_test
    client.subscribe(_user_id + "/move/forward")
    client.subscribe(_user_id + "/move/backward")
    client.subscribe(_user_id + "/move/left")
    client.subscribe(_user_id + "/move/right")
    client.subscribe(_user_id + "/voice/torobot")
    client.subscribe(_user_id + "/gesture")


def on_forward(client, userdata, msg):
    global speedMove
    value = parse_payload(msg.payload)
    print("forward " + value)
    if value == "on":
        robot.forward(speedMove)
    elif value == "off":
        robot.stopFB()


def on_backward(client, userdata, msg):
    global speeedMove
    value = parse_payload(msg.payload)
    print("backward " + value)
    if value == "on":
        robot.backward(speedMove)
    elif value == "off":
        robot.stopFB()


def on_left(client, userdata, msg):
    global speedMove
    value = parse_payload(msg.payload)
    print("left " + value)
    if value == "on":
        robot.left(speedMove)
    elif value == "off":
        robot.stopLR()


def on_right(client, userdata, msg):
    global speedMove
    value = parse_payload(msg.payload)
    print("right " + value)
    if value == "on":
        robot.right(speedMove)
    elif value == "off":
        robot.stopLR()


def on_torobot(client, userdata, msg):
    value = parse_payload(msg.payload)
    print("torobot_test " + value)
    mssg_file_name = _user_id + "_from_web.wav"
    voice_mssg = VoiceMessage()
    voice_mssg.download_file(mssg_file_name)
    cmd = "omxplayer -o alsa " + "/home/pi/WAVEGO/RPi/" + mssg_file_name
    os.system(cmd)
    

def on_gesture(client, userdata, msg):
    value = parse_payload(msg.payload)
    print("gesture " + value)
    if value == "handshake":
        robot.handShake()
    elif value == "steady":
        robot.steadyMode()
    elif value == "jump":
        robot.jump()
    elif value == "sit":
        robot.sit()
    elif value == "standUp":
        robot.standUp()
    elif value == "leftHand":
        robot.leftHand()
    elif value == "rightHand":
        robot.rightHand()
    elif value == "lower":
        robot.lower()
    elif value == "upper":
        robot.upper()


parser = argparse.ArgumentParser()
parser.add_argument('--user_id',
                    help="User ID registered in DB in integer")
args = parser.parse_args()
_user_id = args.user_id

client = mqtt.Client()
client.on_connect = on_connect
client.message_callback_add(_user_id + "/move/forward", on_forward)
client.message_callback_add(_user_id + "/move/backward", on_backward)
client.message_callback_add(_user_id + "/move/left", on_left)
client.message_callback_add(_user_id + "/move/right", on_right)
client.message_callback_add(_user_id + "/voice/torobot", on_torobot)
client.message_callback_add(_user_id + "/gesture", on_gesture)

# connect to broker
client.connect(_mqtt_broker_ip, 1883, 60)

# Blocking call that processes network traffic, dispatches callbacks and
# handles reconnecting.
# Other loop*() functions are available that give a threaded interface and a
# manual interface.
client.loop_forever()
