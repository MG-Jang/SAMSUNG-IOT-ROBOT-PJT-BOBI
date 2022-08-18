## 센싱 및 폴링

### 사용한 센서

- OLED 128 x 64 I2C 통신 지원 => SDA 2번핀, SCL 3번핀
- DHT11 : 18번핀
- Gas 센서 => 디지털 핀 : 15번핀
- 터치 센서 : 14번핀

모든 센서는 동작전압 3.3V에도 동작한다.

### 설명

- 연결된 mysql에서 친밀도 폴링
- 터치센서를 쓰다듬으면 친밀도 증가 및 OLED에 `사랑스러움` 표현
- DHT11 및 Gas 센서를 통해 얻은 센서 값을 mysql에 1분마다 업로드 시킴

## 라이브러리 설치

- Gas 센서와 터치 센서는 따로 라이브러리 설치가 필요없고, GPIO핀만 알맞게 연결주면 된다.

### OLED

- I2C 활성화

```
sudo raspi-config
3. Interface Options
P5. I2C
```

- 라이브러리 설치

```
git clone https://github.com/adafruit/Adafruit_Python_SSD1306.git
cd Adafruit_Python_SSD1306
sudo python3 setup.py install
sudo pip3 install Adafruit_BBIO
```

### DHT11

```
pip3 install adafruit-circuitpython-dht
sudo apt-get install libgpiod2
```

센서들이 알맞게 연결되고, 라이브러리들이 잘 설치되었다면, 다음 명령어를 통해 실행시켜보자!

```
python3 mysql_sensing.py
```
