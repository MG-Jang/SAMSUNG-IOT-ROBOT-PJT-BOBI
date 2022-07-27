## 센서

센서명 : OLED SSD1306 I2C 지원

크기 : 0.96인치 128 x 64

핀 : VCC(3.3V) / GND / SDA / SCL

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/613e078b-b01d-4802-b1e1-71ee32f210d6/Untitled.png)

## 세팅

### I2C

- 1개의 마스터와 여러 개의 슬레이브들을 연결하여 `SDA와 SCL`로 데이터 전달
- 반이중 방식 : 송수신 동시에 불가능 ex) 무전기
- 슬레이브는 각자의 주소가 있기 때문에, 해당되는 슬레이브와만 통신 가능
- SCL(Serial Clock) : 마스터와 슬레이브 간의 클럭을 맞춰 데이터 송수신
- SDA(Serial Data) : 데이터 전달 라인, SCL이 Low일 때 데이터 송수신

### I2C 설정

1. I2C 활성화 되어있는지 CLI로 확인하기

```python
ls -al /dev/i2c*
```

1. GUI로 켜기

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0e8db9d0-e49a-4c65-bd9a-29ce9c07693d/Untitled.png)

1. CLI로 켜기

   CLI로 키면 재부팅시 세팅 초기화가 되는 듯 하다.

```python
sudo raspi-config
3. Interface Options
P5. I2C
```

### I2C 툴 설치

```python
sudo apt-get install -y i2c-tools
```

### I2C 연결 장치 확인

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

### 예제 실행

```python
cd examples
vi image.py     # vim이 깔려있어야 함
```

다음과 같이 코드 수정 후 저장(:wq)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/85a46a38-1b8b-47d2-85ce-a83e27380b8d/Untitled.png)

```python
python3 image.py
```

### 참고 사이트

[https://rudalskim.tistory.com/109](https://rudalskim.tistory.com/109)

## 오류

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c60b51c1-7e4e-4114-90d0-b2b93390c247/Untitled.png)

## 해결책

SPI 통신에서는 RST 핀이 존재하여 RST 변수를 사용하지만, I2C 통신에서 RST핀을 사용하지 않기 때문에, 해당 변수를 설정해주면 위와 같은 에러가 발생한다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5767aa3a-e266-4882-a4d6-58b04ce0cede/Untitled.png)

RST 변수를 다음 이미지와 같이 변경하고 저장 후 실행시키면 동작한다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/684e67ba-600c-4b66-af2d-7a72ad516e27/Untitled.png)

## 다른 해결책

1. [https://learn.adafruit.com/adafruit-pioled-128x32-mini-oled-for-raspberry-pi/usage](https://learn.adafruit.com/adafruit-pioled-128x32-mini-oled-for-raspberry-pi/usage)
2. [https://learn.adafruit.com/ssd1306-oled-displays-with-raspberry-pi-and-beaglebone-black/usage](https://learn.adafruit.com/ssd1306-oled-displays-with-raspberry-pi-and-beaglebone-black/usage)

## 2개의 OLED를 따로 조작하기

### I2C 통신 활성화

- 사용가능한 I2C 핀 : 현재는 I2C-1번만 활성화 되어 있다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3511ebd5-51d3-4299-a9cd-15d7c25306a2/Untitled.png)

## 다중 I2C 핀 설정

```python
sudo vi /boot/config.txt
# I2C-6 세팅, GPIO핀에 맞게 열어주기
dtoverlay=i2c-gpio,bus=6,i2c_gpio_sda=22,i2c_gpio_scl=23
#dtoverlay=i2c6,pins_22_23

sudo reboot -h now

sudo i2cdetect -l  # 활성환 I2C 포트 확인
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b73576e5-4faa-4426-9f58-5f0adf665d7d/Untitled.png)

## 참고사이트

[https://docs.circuitpython.org/projects/ssd1306/en/latest/](https://docs.circuitpython.org/projects/ssd1306/en/latest/)
