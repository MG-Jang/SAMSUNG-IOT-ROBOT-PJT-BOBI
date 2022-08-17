import paho.mqtt.client as mqtt

# The callback for when the client receives a CONNACK response from the server.
def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))

    # Subscribing in on_connect() means that if we lose the connection and
    # reconnect then subscriptions will be renewed.
    client.subscribe("test/windows")

# The callback for when a PUBLISH message is received from the server.
def on_message(client, userdata, msg):
    print(msg.topic+" "+str(msg.payload))
    
def on_forward(client, userdata, msg):
    print("inside on forward callback")
    print(msg.payload)

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message
client.message_callback_add("test/windows", on_forward)

# connect to broker
client.connect("172.30.1.8", 1883, 60)

# publish test
client.publish("test/paho", "hello from paho")
# Blocking call that processes network traffic, dispatches callbacks and
# handles reconnecting.
# Other loop*() functions are available that give a threaded interface and a
# manual interface.
client.loop_forever()