## 사용할 센서 종류

- OLED 128x64 I2C 지원 2EA
- DHT11 온습도 센서
- MQ-135 Gas 센서
- TTP223 정전식 터치센서
- HC-SR04 초음파 센서
- 3.5mm 스피커

### 공통 핀 맵

VCC : 3.3V => Board 1핀
GND : ground => Board 14핀

## OLED 센서 세팅

### I2C 세팅

1. I2C 활성화 되어있는지 CLI로 확인하기

```python
ls -al /dev/i2c*
```

2. I2C CLI를 통해 켜기

```python
sudo raspi-config
3. Interface Options
P5. I2C
```

3. I2C 연결 장치 확인

```python
i2cdetect -y 1
```

### 라이브러리 설치

```python
git clone https://github.com/adafruit/Adafruit_Python_SSD1306.git
cd Adafruit_Python_SSD1306
sudo python3 setup.py install
sudo pip3 install Adafruit_BBIO
```

### Test

- SDA : GPIO 2핀 , SCL : GPIO 3핀

```
python3 test_oled.py
```

## DHT11 센서 세팅

### 라이브러리 설치

```
pip3 install adafruit-circuitpython-dht
sudo apt-get install libgpiod2
```

### Test

- Data : GPIO 18핀

```
python3 test_dht11.py
```

## MQ-135 Gas 센서 세팅

### test

- DO : GPIO 17핀

```
python3 test_gas.py
```

## TTP223 정전식 터치센서 세팅

### test

- Data : GPIO 4핀

```
python3 test_touch.py
```

## HC-SR04 초음파 센서 세팅

### test

- Echo : GPIO 27핀 , Trig : GPIO 22핀

```
python3 test_sonic.py
```

## 3.5mm 스피커 세팅

1. 3.5파이에 스피커 연결하기
2. 라이브러리 설치

```
sudo apt-get install alsa-utils
```

### test

```
aplay /usr/share/sounds/alsa/Side_Right.wav
```
