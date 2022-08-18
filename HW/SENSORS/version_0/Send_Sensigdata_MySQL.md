## RPI 세팅

### DB에 정확한 시간을 사용하기 위한 시간 세팅

```python
sudo apt update
sudo apt install rdate vim -y
sudo rdate -s time.bora.net
sudo ln -sf /usr/share/zoneinfo/Asia/Seoul /etc/localtime
date
```

### Mysql 설치

```python
python3 -m pip install mysql-connector
python3 -m pip install mysql-connector-python
```

### 간단 테스트

- Table에 데이터 값이 있을경우 가능
- AWS 주소, 계정 ID/PW, 스키마명, 테이블명을 알고 있어야 함

### MySQL 정보

![image](https://user-images.githubusercontent.com/99601412/183573550-6d4a3203-6a5f-4fe3-9a9e-289a02eccd4c.png)

테스트 코드

```python
import mysql.connector

db = mysql.connector.connect(host='AWS IP 주소`, user=`관리자 계정 ID', password='관리자 PW', database='생성한 스키마명', auth_plugin='mysql_native_password')
cur = db.cursor()

#query
cur.execute("select * from bobi_sensor")

#print
for (sensor_id, gas, temperature, humidity, datetime, battery, robot_id) in cur:
    print(sensor_id, gas, temperature, humidity, datetime, battery, robot_id)

cur.close()
db.close()
```

## RPi-센서 연결 테스트

### 사용할 센서 종류

1. 온습도센서(dht11)
2. 가스센서(MQ-135)

## 온습도 센서

- VCC : 3V or 5.5V
- data : GPIO 핀 - 본인은 3번 핀

### 세팅

```python
pip3 install adafruit-circuitpython-dht
	sudo apt-get install libgpiod2
```

### 테스트 코드

```python
import time
import board
import adafruit_dht

dhtDevice = adafruit_dht.DHT11(board.D3)  # D3 : 3번핀  ex) 11번핀 연결시 D11로 변경

while True:
    try:
        # Print the values to the serial port
        temperature_c = dhtDevice.temperature
        temperature_f = temperature_c * (9 / 5) + 32
        humidity = dhtDevice.humidity
        print(
            "Temp: {:.1f} F / {:.1f} C    Humidity: {}% ".format(
                temperature_f, temperature_c, humidity
            )
        )

    except RuntimeError as error:
        # Errors happen fairly often, DHT's are hard to read, just keep going
        print(error.args[0])
        time.sleep(2.0)
        continue
    except Exception as error:
        dhtDevice.exit()
        raise error

    time.sleep(2.0)
```

## 가스센서

- VCC : 3V or 5.5V
- DO : GPIO 핀 - 본인은 4번 핀
- AO : x → 라즈베리파이에서는 아날로그 지원안함

### 테스트 코드

```python
import RPi.GPIO as GPIO
import time

gas_pin = 4 # DO에 연결된 핀 번호에 맞추기

GPIO.setmode(GPIO.BCM)
GPIO.setup(gas_pin, GPIO.IN)

try:
    while True:
        a = GPIO.input(gas_pin)
        print(a) # 가스 검출 시 0 검출 x 1
        time.sleep(1)

except KeyboardInterrupt:
    GPIO.cleanup()
```

## 종합 최종 테스트

### 테스트 코드

```python
import mysql.connector
from threading import Timer, Lock
from time import sleep
import signal
import sys
import os
import logging
import traceback
logging.basicConfig(level=logging.DEBUG)

import time
import board
import adafruit_dht
from time import sleep
import RPi.GPIO as GPIO
import datetime

def closeDB(signal, frame):
    print("BYE")
    cur.close()
    db.close()
    timer.cancel()
    sys.exit(0)

def sensing():
    global cur, db, dhtDevice, temperature_c, humidity

    try:
        temperature_c = dhtDevice.temperature
        humidity = dhtDevice.humidity

    except RuntimeError as error:
        a = 1 # dummy

    gas = GPIO.input(gas_pin)

    time = datetime.datetime.now()
    battery = 1
    robot_id = 1

    msg = "Temp : " + str(temperature_c) + "  Humid : " + str(humidity) + " Gas : " + str(gas)
    print(msg)

    query = "insert into bobi_sensor(gas, temperature, humidity, datetime, battery) values (%s, %s, %s, %s, %s)"
    value = (gas, temperature_c, humidity, time, battery)

    lock.acquire()
    cur.execute(query, value)
    db.commit()
    lock.release()

    global timer
    timer = Timer(1, sensing)
    timer.start()

# init
db = mysql.connector.connect(host='AWS IP 주소`, user=`관리자 계정 ID', password='관리자 PW', database='생성한 스키마명', auth_plugin='mysql_native_password')
cur = db.cursor()

timer = None

dhtDevice = adafruit_dht.DHT11(board.D3)
gas_pin = 4
GPIO.setmode(GPIO.BCM)
GPIO.setup(gas_pin, GPIO.IN)

lock = Lock()

signal.signal(signal.SIGINT, closeDB)
sensing()
```

### 문제점

1. 연결 오류

![image](https://user-images.githubusercontent.com/99601412/183573680-7cc6da95-e606-4597-8ac4-625de681fa4d.png)

- MySQL 정보가 잘못되었다는 뜻 ⇒ db 변수에 올바른 MySQL 정보 입력

1. 외래키 데이터 전송

![image](https://user-images.githubusercontent.com/99601412/183573706-e4c7afdc-d315-4c04-9bf2-88b06a8354ae.png)

- 외래키에는 데이터를 넣는 것을 거부한다. ⇒ 외래키로 지정한 속성에는 데이터 전송하지 말기

1. 주키 데이터 전송

![image](https://user-images.githubusercontent.com/99601412/183573740-aaaadc1c-5e39-4ac0-a901-96ccb40c0e08.png)

![image](https://user-images.githubusercontent.com/99601412/183573749-6a131195-c994-45aa-bc46-dd57bff2fe82.png)

- 주키를 AI(자동 증감)으로 설정하지 않을경우, 중복되지 않은 int 값을 주키에 필수적으로 데이터 전송해줘야한다. 따라서, `AI를 설정`해줄것!
