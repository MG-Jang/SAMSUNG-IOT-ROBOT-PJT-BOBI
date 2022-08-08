### 터치 센서 테스트

### 센서 정보

- 센서명 : 정전식 터치센서 TTP223
- 동작전압 : 3.3V or 5V

### 테스트 코드

```python
import RPi.GPIO as GPIO
import time

tilt_pin = 4 #터치 센서의 경우 센서만 바꾸면 됨

GPIO.setmode(GPIO.BCM)
GPIO.setup(tilt_pin, GPIO.IN)

try:
    while True:
        a = GPIO.input(tilt_pin)
        print(a) # 터치 누르면 1 안누르면 0 출력
        time.sleep(1)

except KeyboardInterrupt:
    GPIO.cleanup()
```

### 결과

- `3.3V` 에서 테스트 해보았고, 보통 센서와 다르게 VCC와 GND를 연결해준다고 LED가 켜지는 것이 아니라, 센서를 터치해야 LED가 켜지는 방식이다.
- 정전식 터치 답게 터치 부분에 가까이 손가락만 가져다 되어도 LED가 켜지게 된다.
- 터치센서에 터치가 가해졌다고 판단되면, LED 뿐만 아니라 작성한 코드 대로 `1`로 출력된다. (터치 x ⇒ 0)

### 문제점

- 센서를 2개 이상 사용할 때, GPIO 핀을 공유할 경우 문제 발생
- `상황` : 터치 센서 2개를 GPIO 4핀에 같이 연결 ⇒ 2개의 Switch를 동시에 터치해야 인식됩니다.
- `결론` : 터치 센서는 GPIO 핀을 중복 사용하면 안된다.
