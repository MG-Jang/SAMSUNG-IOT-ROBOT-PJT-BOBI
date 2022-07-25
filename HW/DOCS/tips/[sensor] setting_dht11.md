## 환경

보드 : 라즈베리파이 4

OS : 라즈베리파이 OS Legacy

센서명 : DHT11

설치되어 있는 python 환경 체크 방법

```python
ls /usr/local/lib/
```

파이썬 환경 : python 2.7 python 3.7

### 참고 사이트

[https://fishpoint.tistory.com/5224](https://fishpoint.tistory.com/5224)

[https://park-duck.tistory.com/entry/Python-라즈베리4-Adafruit-DHT1122온습도센서](https://park-duck.tistory.com/entry/Python-%EB%9D%BC%EC%A6%88%EB%B2%A0%EB%A6%AC4-Adafruit-DHT1122%EC%98%A8%EC%8A%B5%EB%8F%84%EC%84%BC%EC%84%9C)

## 회로 연결

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/31d10285-1eda-4f2c-b20e-9e8819990126/Untitled.png)

### Vim 설치

```python
sudo apt install vim -y
```

## 설치 방법 1

`구글링을 통해 해당 방법 또한 가능하다고 하지만, 본인은 실행하면 오류가 발생함.`

도전해보고 싶다면 해보고, 그렇지 않다면, `하단에 설치 방법 2`로 가기!

```python
git clone https://github.com/adafruit/Adafruit_Python_DHT.git
cd Adafruit_Python_DHT/
sudo python3 setup.py install
cd /usr/local/lib/python3.7/dist-packages/
```

마지막 명령어를 입력하면

1. Adafruit_DHT
2. Adafruit_DHT-1.4.0-py3.7-linux-armv7l.egg

2가지 중 어느 디렉토리가 있는지 확인해보고, 1번 혹은 2번 중 맞는 명령어를 통해 실행해보자!

```python
sudo vi /usr/local/lib/python3.7/dist-packages/Adafruit_DHT/platform_detect.py
sudo vi /usr/local/lib/python3.7/dist-packages/Adafruit_DHT-1.4.0-py3.7-linux-armv7l.egg/Adafruit_DHT/platform_detect.py
```

해당 파일에서 다음 내용을 추가하자!

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/958b1e55-0cb9-402a-b28f-296770dd5428/Untitled.png)

### dht11 테스트 코드

```python
import time
import Adafruit_DHT

sensor = Adafruit_DHT.DHT11

pin = 4

try:

    while True :

        h, t = Adafruit_DHT.read_retry(sensor, pin)

        if h is not None and t is not None :
            print("Temperature = {0:0.1f}*C Humidity = {1:0.1f}%".format(t, h))
        else :
            print('Read error')
            time.sleep(100)
except KeyboardInterrupt:
    print("Terminated by Keyboard")

finally:
    print("End of Program")
```

dht11 테스트 코드를 생성 하였다면, 생성된 [파일명].py 으로 실행 시킵니다.

```python
python3 [파일명].py
```

## 오류

### sudo python3 setup.py install 설치 오류

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/eef4bfcc-11a9-48a4-bf1f-0f0dfbc96730/Untitled.png)

해결 방법 : 그냥 SD카드 엎었더니 잘됨

## python3 [파일명].py 실행 오류

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c6c5ed19-33a1-4738-8430-fe652b5ae07d/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/968a1f8c-354f-4861-9d05-999e2ea2e7a3/Untitled.png)

해결책 : 구글링을 통해 여러 시간 들여 해봐도 안됨, 모르겠음

## 설치 방법 2 - 확실한 해결책

### 라이브러리 설치

```python
pip3 install adafruit-circuitpython-dht
sudo apt-get install libgpiod2
```

### 테스트 코드

[test.py](http://test.py) ⇒ 원하는 파일명으로 생성하고 확장자만 `.py` 유지할것!

```python
import time
import board
import adafruit_dht

dhtDevice = adafruit_dht.DHT11(board.D4)  # D4 : 4번핀  ex) 11번핀 연결시 D11로 변경

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

### 실행

```python
python3 test.py
```

### 참고 사이트

[https://learn.adafruit.com/dht-humidity-sensing-on-raspberry-pi-with-gdocs-logging/python-setup](https://learn.adafruit.com/dht-humidity-sensing-on-raspberry-pi-with-gdocs-logging/python-setup)
