## 환경

보드 : 라즈베리파이 4

센서명 : DHT11

설치되어 있는 python 환경 체크 방법

```python
ls /usr/local/lib/
```

파이썬 환경 : python 2.7 python 3.9

```python
python --version
```

### 참고 사이트

[https://fishpoint.tistory.com/6625](https://fishpoint.tistory.com/6625)

## 설치

```python
git clone https://github.com/adafruit/Adafruit_Python_DHT
cd Adafruit_Python_DHT/
sudo python3 setup.py install
sudo nano /usr/local/lib/python3.7/dist-packages/Adafruit_DHT/platform_detect.py
```

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

dht11 테스트 코드를 생성 하였다면, 생성된 파일명으로 실행 시킵니다.

```python
python3 [파일명]
```

## 오류

### sudo python3 setup.py install 설치 오류

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/eef4bfcc-11a9-48a4-bf1f-0f0dfbc96730/Untitled.png)

### 해결책

추후 수정
