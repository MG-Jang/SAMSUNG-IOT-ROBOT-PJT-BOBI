#!/bin/bash
# $1: user id

cd ~/google_stt
source env/bin/activate
cd ~/WAVEGO/RPi
python3 mqtt_subscribe.py --user_id $1 