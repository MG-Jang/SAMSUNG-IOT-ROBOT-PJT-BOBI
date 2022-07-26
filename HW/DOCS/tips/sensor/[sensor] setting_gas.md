![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9be87f66-6bf4-495a-8b65-6b9ac5eb7730/Untitled.png)

- 센서명 : MQ-135
- 동작전압 : 3.3V or 5V ⇒ 5V 연결시 센서가 조금 뜨거워지는 경향이 있다. 3.3V도 정상 작동한다.
- 핀 구성 : A0(아날로그)/D0(디지털)/VCC/GND
- 가스 인식 종류 : 이산화탄소(CO2), 암모니아(NH3), 질소 산화물(NOx), 알콜류, 벤젠 및 연기 등 유해가스, 공기질 센서

## 테스트 코드

라즈베리파이는 `아날로그`를 지원안하기 때문에 D0핀을 사용한다.

아날로그 값을 얻고 싶다면, [https://fishpoint.tistory.com/7184](https://fishpoint.tistory.com/7184) 다음을 참고하자!

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
