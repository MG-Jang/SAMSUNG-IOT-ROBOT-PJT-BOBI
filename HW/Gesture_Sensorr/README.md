## I2C 세팅

```
sudo raspi-config
3. Interface Options
P5. I2C
```

### I2C 확인

```
i2cdetect -y 1
```

## 라이브러리 설치

```
pip3 install adafruit-circuitpython-dht
sudo apt-get install libgpiod2

git clone https://github.com/adafruit/Adafruit_Python_SSD1306.git
cd Adafruit_Python_SSD1306
sudo python3 setup.py install
sudo pip3 install Adafruit_BBIO

python3 -m pip install mysql-connector
python3 -m pip install mysql-connector-python
```

## 센서 연결

- 모든 센서는 3.3V에 작동합니다

### 센서 종류

- 터치 센서 : 14핀
- OLED => SDA : 2핀 , SCL : 3핀

## Test

- Test 폴더 내의 3개의 폴더 각자 실행시켜보기
