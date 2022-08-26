import paho.mqtt.client as mqtt

_mqtt_broker_ip = "[server ip]"
_user_id="testuser"

def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))

    # subscribe on predefined topics for robot
    client.subscribe(_user_id + "/move/forward")
    client.subscribe(_user_id + "/move/backward")
    client.subscribe(_user_id + "/move/left")
    client.subscribe(_user_id + "/move/right")
    client.subscribe(_user_id + "/voice/torobot")
    client.subscribe(_user_id + "/powersaving/on")
    client.subscribe(_user_id + "/powersaving/off")
    
def on_forward(client, userdata, msg):
    print("forward " + str(msg.payload))
    
def on_backward(client, userdata, msg):
    print("backward " + str(msg.payload))

def on_left(client, userdata, msg):
    print("left " + str(msg.payload))

def on_right(client, userdata, msg):
    print("right " + str(msg.payload))

def on_torobot(client, userdata, msg):
    print("torobot " + str(msg.payload))

def on_powersaving_on(client, userdata, msg):
    print("power saving on " + str(msg.payload))

def on_powersaving_off(client, userdata, msg):
    print("power saving off " + str(msg.payload))


client = mqtt.Client()
client.on_connect = on_connect
client.message_callback_add(_user_id + "/move/forward", on_forward)
client.message_callback_add(_user_id + "/move/backward", on_backward)
client.message_callback_add(_user_id + "/move/left", on_left)
client.message_callback_add(_user_id + "/move/right", on_right)
client.message_callback_add(_user_id + "/voice/torobot", on_torobot)
client.message_callback_add(_user_id + "/powersaving/on", on_powersaving_on)
client.message_callback_add(_user_id + "/powersaving/off", on_powersaving_off)

# connect to broker
client.connect(_mqtt_broker_ip, 1883, 60)

# Blocking call that processes network traffic, dispatches callbacks and
# handles reconnecting.
# Other loop*() functions are available that give a threaded interface and a
# manual interface.
client.loop_forever()
