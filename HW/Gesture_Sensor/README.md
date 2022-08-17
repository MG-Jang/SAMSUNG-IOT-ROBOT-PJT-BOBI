## I2C 세팅

- OLED 출력을 위한 I2C 세팅

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
# DHT11 라이브러리 설치
pip3 install adafruit-circuitpython-dht
sudo apt-get install libgpiod2

# OLED 라이브러리 설치
git clone https://github.com/adafruit/Adafruit_Python_SSD1306.git
cd Adafruit_Python_SSD1306
sudo python3 setup.py install
sudo pip3 install Adafruit_BBIO

# MySQL 라이브러리
python3 -m pip install mysql-connector
python3 -m pip install mysql-connector-python
```

## 센서 연결

- 모든 센서는 3.3V에 작동합니다

### 센서 종류

- 터치 센서 : GPIO 18번핀
- Gas 센서 : GPIO 17번핀
- 온습도 센서 : GPIO 4번핀
- OLED => SDA : GPIO 2번핀 , SCL : GPIO 3번핀

## Test

### 온습도 센서 test

```
python3 dht11.py
```

### OLED 테스트

```
python3 image.py
```

### MySQL 테스트

```
python3 polling.py
```

## 통합 테스트

```
python3 mysql_sensing.py
```

### 설명

1. 60초에 한번씩 온습도센서, 가스센서에서 읽어들인 `센서값`을 DB에 올린다.
2. 파일 실행시 연결된 DB를 통해 `친밀도`값 한번 받아오기
3. 터치센서를 10초에 한번 씩 터치할 때 마다 친밀도가 `10`만큼 증가한다.
4. 터치센서를 터치할 때, OLED에 하트 이미지가 출력된다.
