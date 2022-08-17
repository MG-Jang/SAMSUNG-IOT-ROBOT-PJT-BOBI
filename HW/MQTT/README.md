---
author: Dongwon Kim
date: 2022-08-12
---

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
