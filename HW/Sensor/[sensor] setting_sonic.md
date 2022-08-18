## 부품

부품명 : HC-SR04(초음파 센서)

측정거리 : 2cm ~ 400cm

저항 : 330Ω/470Ω 혹은 1kΩ/2kΩ 혹은 4.7kΩ/10kΩ

## 회로 연결

### 1. 저항 연결 x

![image](https://user-images.githubusercontent.com/99601412/184352148-51872406-e9f7-4c4b-b35c-874c703ab33f.png)

### 2. 저항 연결 o

[https://blog.naver.com/PostView.nhn?blogId=jcmh74&logNo=222040330497&parentCategoryNo=&categoryNo=&viewDate=&isShowPopularPosts=false&from=postView](https://blog.naver.com/PostView.nhn?blogId=jcmh74&logNo=222040330497&parentCategoryNo=&categoryNo=&viewDate=&isShowPopularPosts=false&from=postView)

저항 연결 하는 이유는 송수신 할 때의 제한 전압과 전류를 초과하기 때문에 사용해준다고 한다. 하지만, 오랜 기간 동안 저항 없이 초음파 센서를 사용해보기도 하였다.

![image](https://user-images.githubusercontent.com/99601412/184352189-f9cc390c-4e18-4568-8a28-4ee5c99dcc97.png)

## 테스트 코드

### gpiozero 라이브러리

```python
from gpiozero import DistanceSensor
from time import sleep

sensor = DistanceSensor(18,17) # Echo, Trig

while True:
    print(sensor.distance, "m")
    sleep(0.1)
```

### RPi.GPIO 라이브러리

```python
import RPi.GPIO as GPIO                    # RPi.GPIO에 정의된 기능을 GPIO라는 명칭으로 사용
import time                                # time 모듈

GPIO.setmode(GPIO.BCM)                     # GPIO 이름은 BCM 명칭 사용
GPIO.setup(17, GPIO.OUT)                   # Trig=17 초음파 신호 전송핀 번호 지정 및 출력지정
GPIO.setup(18, GPIO.IN)                    # Echo=18 초음파 수신하는 수신 핀 번호 지정 및 입력지정

print “Press SW or input Ctrl+C to quit”   # 메세지 화면 출력

try:
    while True:
            GPIO.output(17, False)
            time.sleep(0.5)

            GPIO.output(17, True)          # 10us 펄스를 내보낸다.
            time.sleep(0.00001)            # Python에서 이 펄스는 실제 100us 근처가 될 것이다
            GPIO.output(17, False)         # 하지만 HC-SR04 센서는 이 오차를 받아준다

            while GPIO.input(18) == 0:     # 18번 핀이 OFF 되는 시점을 시작 시간으로 잡는다
               start = time.time()

            while GPIO.input(18) == 1:     # 18번 핀이 다시 ON 되는 시점을 반사파 수신시간으로 잡는다
               stop = time.time()

            time_interval = stop – start      # 초음파가 수신되는 시간으로 거리를 계산한다
            distance = time_interval * 17000
            distance = round(distance, 2)

            print “Distance => “, distance, “cm”

except KeyboardInterrupt:                  # Ctrl-C 입력 시
    GPIO.cleanup()                         # GPIO 관련설정 Clear
    Print "bye~"
```
