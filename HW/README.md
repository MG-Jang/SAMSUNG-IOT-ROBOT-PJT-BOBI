---
last modified: 2022-08-18
---
# 🤖 HW(robot)
- 로봇에서는 영상 인식, 음성 인식, 센서 등은 라즈베리파이에서 담당하고 모터, 부저는 ESP32에서 담당
- 로봇 사용을 위해 기본 세팅을 진행 후 프로젝트 세팅 진행 
- ESP32를 먼저 키고 라즈베리파이를 켜야 정상동작
- 자세한 내용, version 등은 [**wiki**](https://lab.ssafy.com/s07-webmobile3-sub2/S07P12A208/-/wikis/home) 혹은 각 기능의 requirements.txt 참고

## ⚒️ 기본 세팅
### 🥞 How to set RPI
1. 라즈베리파이에 os가 설치된 sd카드 연결
2. 원격 접속(VNC, mobaxterm 등 참고) 혹은 HDMI 케이블을 직접 연결하여 라즈베리파이 접속
3. 라즈베리파이 터미널에서 입력(로봇 기본 dependencies 설치)
    ```
    $ sudo git clone https://github.com/waveshare/WAVEGO.git
    $ sudo python3 WAVEGO/RPi/setup.py
    ``` 
4. Completed 가 뜨고 라즈베리파이가 재부팅 되면 성공  

[영상 참고](https://youtu.be/SlyIttHri6M)

### 📟 How to set Arduino(ESP32)
1. Arduino IDE를 개인 PC에 다운 받기
2. ESP32 개인 PC에 유선으로 연결
3. `file → Preferences → Additional Boards Manager URLS` 에 `https://dl.espressif.com/dl/package_esp32_index.json 입력 → OK` 입력
4. IDE 다시 시작
5. `Tools → Board → Boards`에서 ESP32 검색 & Install 클릭
6. 라이브러리 설치
    - Tools → Manage Libraries에서 아래 라이브러리 검색하여 설치(Install 혹은 Update)
        - ArduinoJson
        - Adafruit SSD1306
        - Adafruit PWM Servo Driver Library
        - ICM20948 WE
        - INA219 WE
        - Adafruit NeoPixel
7. [로봇 데모코드](https://www.waveshare.com/w/upload/3/32/WAVEGO_Demo_Code_%28Arduino%29_220128.zip)를 다운받아 압축 풀기
8. `WAVEGO/Arduino/WAVEGO/WAVEGO.ino`를 Arduino IDE에서 run
9. `Tools → Port`에서 아두이노가 연결되어 있는 포트 선택
10. `Tools → Boards → ESP32 Arduino → ESP32 Dev Module` 선택
    - configure 세팅 예시
    ```
    Upload Speed: "921600"
    CPU Frequency: "240MHz(WiFi/BT)"
    Flash Frequency: "80MHz"
    Flash Mode: "QIO"
    Flash Size: "4MB(32Mb)"
    ''' Partition Scheme: "Huge APP(3MB No OTA/1MB SPIFFS)"
    PSRAM: "Enabled"'''
    ```
    - Tools → PSRAM → Enabled 로 되어 있어야 함
11. Upload 버튼 클릭

[로봇 데모 ESP32 참고](https://www.waveshare.com/wiki/WAVEGO#Install_Arduino_IDE) 

## ⚒️ 프로젝트 세팅
- 개인 PC에서 코드 가져오기
    - git bash에서
    ```
    $ git clone https://lab.ssafy.com/s07-webmobile3-sub2/S07P12A208.git
    ```
- 라즈베리파이에 코드 넣기
    - clone한 dir에서 HW/VOICE_DETECTION 내에 있는 파일(version_0 dir 제외)를 모두 라즈베리파이의 ~/WAVEGO/RPi 내로 옮김
### 🌡️ 모듈 세팅
- 사용할 모듈
    - OLED 128x64 I2C 지원 2EA 
    - DHT11 온습도 센서
    - MQ-135 Gas 센서
    - TTP223 정전식 터치센서
    - HC-SR04 초음파 센서
    - 3.5mm 스피커
    - USB 마이크 2개
- 모두 3.3V 사용
- Pin Map
    | 센서 | 센서 pin | RPI 핀|
    |:--:|:--:|:--:|
    |Touch|Data|GPIO 4|
    |GAS|Data|GPIO 17|
    |DHT11|Data|GPIO 18|
    |초음파|Data1|GPIO 27|
    |초음파|Data2|GPIO 22|
    |OLED|SDA|GPIO 2|
    |OLED|SCL|GPIO 3|
    |VCC||board 1|
    |GND||board 14|
    
    - 모든 센서의 VCC, GND는 빵판을 이용하여 표에 표기된 VCC, GND와 연결
    - OLED 2개의 SDA, SCL은 각각 빵판을 이용하여 표에 표기된 SDA, SCL에 연결(동일한 신호를 OLED 2개에서 받음)
- 3.5mm 스피커는 3.5mm 잭에 연결하여 사용
- USB 마이크 2개는 라즈베리파이 USB 2.0에 각각 꽂아 사용
1. I2C 통신 활성화
    ```
    $ sudo raspi-config
    ```
    3. Interface Options → P5. I2C
2. 라이브러리 설치
    ```
    $ git clone https://github.com/adafruit/Adafruit_Python_SSD1306.git
    $ cd Adafruit_Python_SSD1306
    $ sudo python3 setup.py install
    $ sudo pip3 install Adafruit_BBIO
    $ pip3 install adafruit-circuitpython-dht
    $ sudo apt-get install libgpiod2
    $ python3 -m pip install mysql-connector
    $ python3 -m pip install mysql-connector-python
    ```
3. 센서 연결 테스트
    ```
    $ python3 ~/WAVEGO/RPi/mysql_sensing.py
    ```

### 📢 음성 인식 세팅
- 라즈베리파이4B Debian Buster 버전(2022.07.26 기준 RPI imager의 legacy 버전)

1. [Google Speech to Text console start guide](https://cloud.google.com/speech-to-text/docs/transcribe-console?hl=ko)를 따라 프로젝트 설정 진행
    - 프로젝트 생성
    - `사용자 인증 정보` 페이지 상단 `+ 사용자 인증 정보 만들기-> 서비스 계정-> 계정 이름 설정`
    - 만든 서비스 계정 클릭 페이지 상단 메뉴 바의 `키-> json`  키 만들기 하여 json 키 다운 받기
    - 라즈베리파이에 해당 키 파일 저장
2. [python 환경 세팅](https://cloud.google.com/python/docs/setup)
    
    ```
    sudo apt update
    sudo apt install python3 python3-dev python3-venv
    sudo apt-get install wget
    wget https://bootstrap.pypa.io/get-pip.py
    sudo python3 get-pip.py
    pip3 --version
    
    cd your-project
    python3 -m venv env
    source env/bin/activate
    ```
    

3. google cloud speech 설치

4. client library 설치
    ```
    pip install --upgrade google-cloud-speech
    ```

5. `export GOOGLE_APPLICATION_CREDENTIALS="KEY_PATH"` 를 이용하여 이전에 RPI에 넣어놓은 key 파일 등록
    - 이 때 상대 경로로 하면 찾을 수 없다는 에러가 발생하므로 **절대 경로**를 사용할 것
6. 라즈베리파이 OS 버전 이슈 해결
    - `ImportError: /lib/arm-linux-gnueabihf/libm.so.6: version GLIBC_2.29 not found (required by /home/pi/google_stt/env/lib/python3.7/site-packages/grpc/_cython/cygrpc.cpython-37m-arm-linux-gnueabihf.so)` 발생
        - Google PubSub가 Debian GLIBC 2.29를 지원하지 않는 것으로 보임
        - 해결 방안으로는 아래 두 가지 존재
            - 라즈베리파이의 OS를 Ubuntu로 변경.
            - PATH를 설정한 후 grpcio를 다시 설치
            
            프로젝트 특성 상 라즈베리파이의 OS를 변경하는 것은 불가능 했으므로 두 번째 방법 사용
            
            1. 텍스트 에디터로 /home/pi/.bashrc 에 아래 줄 추가
                
                `export PATH="$HOME/.local/bin:$PATH"`
                
            2. 아래 명령어 실행
                
                ```
                pip uninstall grpcio
                pip uninstall grpcio-status
                pip install grpcio==1.44.0 --no-binary=grpcio
                pip install grpcio-tools==1.44.0 --no-binary=grpcio-tools
                ```
                
                3, 4번째 명령어 합쳐 실행하는데 1시간 정도 걸림

7. google stt 진행하던 대로 /home/pi/google_stt 내 설정된 env activate(`source env/bin/activate`)
8. `pvporcupine, pvporcupinedemo` 가상 환경 내 설치
    ```
    pip3 install pvporcupine
    pip3 install pvporcupinedemo
    ```
9. 라즈베리파이의 프로젝트 폴더로 이동
    ```
    $ cd ~/WAVEGO/RPi
    ```
10. 필요한 라즈베리파이 설치
    ```
    $ (env) pip install -r voice_requirements.txt
    ```
11. 연결된 마이크 확인
    ```
    $ (env) porcupine_demo_mic --show_audio_devices
    ```
    결과 예시
    ```
    index: 0, device name: USB PnP Sound Device Analog Mono
    index: 1, device name: USB PnP Sound Device Analog Mono
    index: 2, device name: Monitor of Built-in Audio Analog Stereo
    ```
    - USB 마이크가 2개 인식되면 잘 됨
12. 파일 실행(가상 환경 없어도 됨)
    - 11번까지는 초기에만 진행하면 됨
    ```
    $ ~/WAVEGO/RPi/voice.sh [마이크 index] [user id]
    ```
    - 마이크 index는 위에서 보는 것 중 USB 마이크 0 제외 1 혹은 2로 진행하면 됨
    - user id는 웹에서 받은 DB의 아이디

### 🌐 MQTT 통신 세팅
- WEB과 신호를 주고 받기 위해 MQTT 사용
- 라즈베리파이에 코드 넣기
    - clone한 dir에서 HW/MQTT 내에 있는 파일(version_0 dir 제외)를 모두 라즈베리파이의 ~/WAVEGO/RPi 내로 옮김
1. google stt 진행하던 대로 /home/pi/google_stt 내 설정된 env activate(`source env/bin/activate`)
2. 필요한 라이브러리는 voice_requirements.txt에서 이미 설치 완료
3. 실행
    ```
    $ ~/WAVEGO/RPi/mqtt.sh [user id]
    ```
4. 테스트 
    - 개인 PC에서 clone 받은 dir에서 /HW/MQTT/version_0/mqtt_subscribe_test_for_rpi.py를 이용하여 잘 동작하는지 확인 가능
    - 개인 PC에서
        ```
        $ python mqtt_subscribe_test_for_rpi.py -op1 i7a208.p.ssafy.io
        ```
    - 라즈베리파이 콘솔에서 forward, backward 등이 수행이 잘 되면 성공

### 🎥 Video Streaming
1. 라즈베리파이에 라이브러리 설치
    ```
    $ sudo apt update
    $ sudo apt full-upgrade
    $ sudo apt-get install ffmpeg
    ```
2. 개인 구글 아이디로 유튜브 접속
3. 스트리밍 시작하여 키 얻기
4. 라즈베리파이에서 cmd 실행
    ```
    $ ffmpeg -re -i /dev/video0 -f lavfi -i anullsrc -vb 2500k -s 1280x720 -f flv [youtube streaming 키]
    ```

### 🔑 S3 access key 등록
1. AWS에 로그인
2. [IAM console](https://console.aws.amazon.com/iam) 로 이동
3. `My Security Credentials → Access Keys` 로 이동
4. `Create New Access Key` 로 새로운 키 만들기
5. csv 파일 다운 받기
6. 라즈베리파이에 원격으로 접속해서 받은 키 등록
    ```
    $ aws configure
    ```
    - 개인 PC로 받은 csv 파일을 열어 적혀 있는 access key, secret key 등록
 [AWS key 만들기](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#Using_CreateAccessKey)
 [key 등록](https://boto3.amazonaws.com/v1/documentation/api/latest/guide/quickstart.html)