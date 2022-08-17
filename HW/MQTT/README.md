---
author: Dongwon Kim
date: 2022-08-12
---
# MQTT Broker
1. EC2에 원격 접속
2. mosquitto 설치
    ```
    $ sudo apt update
    $ sudo apt full-upgrade
    $ sudo apt install mosquitto
    $ sudo apt install mosquitto-clients
    ```
3. websocket 사용을 위해 config 파일 수정
    - `sudo nano /etc/mosquitto/conf.d/default.conf`
        ```
        # /etc/mosquitto/conf.d/default.conf
        listener 1883
        allow_anomymous true

        listener 9001
        protocol websockets
        allow_anonymous true
        ```
    - `sudo lsof -i | grep 1883` 에서 mosquitto를 찾아 kill
        `sudo kill -9 [process 번호]`
    - `sudo service mosquitto stop` 하고 `lsof`를 이용하여 아예 1883을 사용하는 프로세스가 없도록 설정
    - `cd /etc/mosquitto/conf.d`
    - `mosquitto -c ./default.conf` 실행

# MQTT subscribe
- subscribe MQTT message from web
    - move
    - S3 message sent flag

## Topic
```
# topic structure
#   payload(choose one of them)
user_id
    /move
        /forward
            on
            off
        /backward
            on
            off
        /left
            on
            off
        /right
            on
            off
    /voice
        /torobot
            upload
```

## How to run
### use bash file 
```
$ ~/WAVEGO/RPi/mqtt.sh [user id]
```
or 
### manually run the code
1. activate virtual env
    ```
    $ cd ~/google_stt
    $ source env/bin/activate
   ```
2. run the code
    ```
    $ (env) cd ~/WAVEGO/RPi
    $ (env) python ./mqtt_subscribe.py --user_id [user id]
    ```

## File structure
```
|  mqtt_subscribe.py
|  mqtt.sh
```
