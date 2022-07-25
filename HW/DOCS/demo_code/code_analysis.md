# RPI

## app.py

- flask를 이용한 web app 구동을 위한 함수 모음
- route 설정, class webapp
- flask의 ip, port 등 설정

## base_camera.py

- class CameraEvent
    - 새로운 frame이 들어왔을 때 client에게 signal을 보내주는 event 같은 class
    - wait
        - 새로운 client라면 thread event 등록 하고 events list에 저장
        - client 들이 쓰는 함수
        - 해당 id를 가진 client의 wait
    - set
        - 새로운 frame이 생겼을 때 사용
        - camera thread가 사용하는 함수
        - client가 set 되어 있지 않으면 현재 시간으로 set
        - set 되어 있는 client가 5초 동안 이전 frame을 처리하지 않으면 client가 퇴장했다 생각하고 events list에서 제거
    - clear
        - 모든 events list clear
- class BaseCamera
    - init
        - 카메라가 실행중이지 않으면 background 에서 thread로 처리하도록 thread 생성
    - get_frame
        - CameraEvent class를 이용하여 최신 frame return
            - wait, clear 사용
    - frames
    - thread
        - client에게 새로운  frame이 들어왔다고 신호를 줌
        - 10초 동안 어떤 client도 frame을 요구하지 않으면 자동 종료되는 부분은 주석 처리 되어 있음

## camera_opencv.py

- class BaseCamera를 사용
- class CVThread
    - mode
        - mode, img 설정
    - elementDraw
        - CVMode에 따라 text, 사각형 img에 그림
        - faceDetection, findColor, findlineCV, watchDog
    - findLineTest
        - 라인에 따라서 왼쪽, 오른쪽으로 command를 출력
        - 출력만 하고 실제 로봇에게 명령은 안 내림 - 그냥 테스트용
        - 아무래도 line tracing하는데 쓰는 것인 듯????
    - findLineCtrl
        - 동작은 findLineTest와 동일하나 실제로 로봇에게 명령 내림
    - findlineCV
        - grayscale로 찍은 이미지 변경
        - frame_findline을 이용하여 선 찾기
            - 두 선에 대해 진행
            - lineColorSet이랑 동일한 색을 갖는 라인 판별
        - CVMode에 따라 실행(findLineCtrl, findLineTest 중)
    - findColor
    - faceDetectCV
    - watchDog
        - grayscale로 변환
        - dilate, findContours를 이용하여 이전과 다른 게 있는지 판단
    - pause
    - resume
    - run
- class Camera
- def commandAct

## haarcascade_frontalface_default.xml

- 영상 인식용 학습된 데이터

## info.py

- 라즈베리파이 CPU, GPU, 메모리 사용량과 온도를 측정하여 반환

## robot.py

- 기본 기능에 관련된 함수들
- serial 통신으로 각 기능마다 함수를 보냄
- setUpperIP
    - ipInput으로 들어온 IP를 upperIP로 설정
- lightCtrl
    - colorName에 따라 colorNum 결정해서 json파일로 보냄
        - var: lignt, val: colorNum
- buzzerCtrl
    - json 파일 보내서 부저 울림

## serialTest.py

- 카메라 연결 테스트 진행
- boot/config.txt의 값을  test를 위해 설정함

## setup.py

- 라즈베리 파이에 라이브러리 설치하는 용도
- 센서를 추가한다면, 센서를 동작 시키는 필수 라이브러리 설치 명령어 기입

## webServer.py

- IP, WIFI 세팅 및 로그인 확인
- flask_app의 input에 따라 적절한 response 보내고 cmd에 모드 출력

## dist 폴더

- webapp을 위한 js, css, html 파일 등 포함되어 있음

# Arduino

## InitConfig.h

### 헤더

```python
#include <Wire.h>
#include <ICM20948_WE.h>
#include <INA219_WE.h>
#include <Adafruit_SSD1306.h>
#include <Adafruit_NeoPixel.h>
```

### 설명

- 센서& 모듈 초기 설정, 헤더 include, 다루는 함수 포함
- OLED thread 위한 아두이노 코어 설정
- GPIO 설정
- 서보 모터 중간 값 설정
- wire debug 모드 해제
    - G12 3V3을 연결하면 로봇이 디버그 모드가 됨
- 9축 센서(ICM20948)
    - 헤더 포함
    - InitICM20948(): 초기 세팅
    - accXYZUpdate(): 센서 값 읽어서 ACC_X, ACC_Y, ACC_Z에 저장하는 함수
- 전류 센서(INA219) - 전압 표시 하기 위한 함수
    - 헤더 포함
    - InitINA219(): 초기 세팅
    - InaDataUpdate(): 센서 값 읽어서 갱신
- oled(SSD1306)
    - 헤더 포함
    - InitScreen(): 스크린 초기화, 색 지정, 텍스트 크기 지정 등
    - xyzScreenUpdate(): V, A, P 값 display에 표현
    - allDataUpdate(): 와이파이, 전류 값 읽어와서 display에 표현
- InitBuzzer(): 부저 초기화
- 3색 LED(WS2812)
    - 헤더 포함
    - InitRGB(): RGB 밝기 조절, 시작
    - colorWipe(): 표현 가능 컬러 차례대로 보여주기
    - SetSingleLED(): 특정 컬러 보여주기

## PreferencesConfig.h

### 헤더

```python
#include <Preferences.h>
```

### 함수

- middleUpdate()
    - ServoMiddlePWM 값을 preferences 에서 읽어와서 설정
- servoConigSave(byte activeServo)
    - activeServo 번호에 맞춰 preference에 현재 PWM 값  put
- preferencesSetup()
    - preferences의 ServoConfig는 false 로 시작
    - middleUpdate() 실행
    - delay 500

## ServoCtrl.h

### 헤더

```python
#include <Adafruit_PWMServoDriver.h>
#include <math.h>
```

### 명칭

![Robot_leg](/uploads/6ab76679086097fe782e6834455a5835/Robot_leg.jpg)

---

![Robot_Upper](/uploads/685a830e246ee3dca18b006e6db0d844/Robot_Upper.jpg)
---

L-W : <>모터(wiggle servo라 명칭)와 다리와의 거리 (사진상으로는 수직으로의 거리 생각하면 됨)

 0   Forward  6
 1    -1|^|3-   7
<2> --|^|-- <8>
           | | |
<3> --|^|-- <9>
 4     -2|^|4-  10
 5     --|^|--   11

즉, 왼쪽 위부터 아래로  모터 번호 0,1,2,3,4,5,6

오른쪽 위부터 아래로 모터번호 7,8,9,10,11

---

   <<<[S-A][S-B]<<<
            /        |
       L-A       L-A
        /            |
      O            O
       |            /
     L-B      L-C
       |         /
       |       /
       |     /
       |   /
       | /
      O
     /
   L-D
 /
<---90°
    . L-E
          .

---

   [S-W]---L-W---O
                            |
                            |
                            |
                            |
                            |
                     Ground

### 전역 변수

- Define
    - SERVOMIN : 263
        - 길이를 셀 때 최소 pulse 값
        - out of 4096???
    - SERVOMAX : 463
        - 길이를 셀 때 최대 pulse값
        - out of 4096??
    - SERVO_FREQ : 50
        - 모터의 주파수
        - 50 Hz 밑에서 돌아감
    - SERVO_RANGE : 90
    - M_PI : 3.1415926
        - Pi 값
    - LEG_A_FORE
    - LEG_A_BACK
    - LEG_A_WAVE
- 변수 정의
    - double
        - Linkage_W
            - 19.15mm
            - 흔드는 서보모터와 다리 링크의 평면 사이의 거리
            - 위 사진 참고
        - LInkage_S
            - 12.2mm
            - 두개의 서보모터 사이의 거리
        - Linkage_A
            - 40.0mm
            - 서보모터와 연결되는 링크
        - Linkage_B
            - 40.0mm
            - 방향을 제한하는 링크
            - 아래쪽의 긴 다리와 L-A 사이의 다리
        - Linkage_C
        - 39.8153mm
            - 다리의 위쪽 파트
            - L-A 아래의 긴 다리 중 연결부 위 쪽 부분
        - Linkage_D
            - 31.7750mm
            - 다리의 아래쪽 파트
            - L-A 아래의 긴 다리 중 연결부 아래 쪽 부분
        - Linkage_E
            - 30.8076mm
            - 발
        - WALK_HEIGHT_MAX
            - 110
        - WALK_HEIGHT_MIN
            - 75
        - WALK_HEIGHT
            - 95
        - WALK_LIFT
            - 9
        - WALK_RANGE
            - 40
        - WALK_ACC
            - 5
        - WALK_EXTENDED_X
            - 16
        - WALK_EXTENDED_Z
            - 25
        - WALK_SIDE_MAX
            - 30
        - WALK_MASS_ADJUST
            - 21
        - STAND_HEIGHT
            - 95
    - float
        - WALK_CYCLE_GLOBAL
        - WALK_LIFT_PROP
        - BALANCE_PITCHU_BUFFER
        - BALANCE_ROLL_BUFFER
        - BALANCE_PITCHU_BASE
        - BALANCE_ROLL_BASE

### 함수

- void(*달려있는 함수는 extern void)
    - ServoSetup()
        - IIC통신 시작
        - pwm 시작
        - pwm의 주파수를 SERVO_FREQ로 설정
    - *InitPosAll()
        - 16번의 for문(모터는 12개인데??????)
        - pwm을 MiddlePosition으로 세팅
        - CurrentPWM[i] = MiddlePosition
        - 이를 Serial에 출력(어떤 값인지 확인해보자)
    - *middlePosAll()
        - 16번의 for문
        - pwm을 ServoMiddlePWM[i]로 세팅
        - CurrentPWM[i] = ServoMiddlePWM[i]
        - 이를 Serial에 출력
    - *servoDebug(byte, servoID, int offset)
        - servoID에 맞는 현재의 PWM에 offset 조정
    - GoalPosAll
        - GoalPWM으로 pwm을 세팅
    - goalPWMSet(uint8_t servoNum, double angleInput)
        - int pwmGet = round((SERVOMAX - SERVOMIN) * angleInput / SERVO_RANGE)
        - 
        - pwmGet = pwmGet * ServoDirection[servoNum] + ServoMiddlePWM[servoNum]
        - 
        - servoNum에 해당하는 GoalPWM = pwmGet
    - simpleLinkageIK(double LA, LB, aln, bln, uint8_t outputAlpha uint8_t outputBeta, uint8_t outputDelta)
    - wigglePlaneIK(double LA, double aln, double bln, uint8_t outputAlpha, uint8_t outputLen)
    
    - pitchYawRoll(float pitchInput, float yawInput, float rollInput)
        - 
    - balancing()
        - BALANCE_PITCHU_BUFFER = ACC_Y * BALANCE_P
        - BALANCE_ROLL_BUFFER = ACC_X * BALANCE_P
        - 두 변수 다 범위는 -21 ~ 21
        - pitchYawRoll(BALANCE_PITCHU_BUFFER, 0, BALANCE_ROLL_BUFFER)
    - robotCtrl()
        - 기본 주행 및 특정 행동에 관한 함수
        - 디버그모드가 아니고 특정 행동이 지정되지 않았다(funcMode == 0)면 기본 주행
        - 디버그모드가 아니고 특정행동이 지정되면 그 행동을 Serial에 출력하고 행동 수행, LED색 변경(0, 128, 255), 행동 수행 후 funcMode = 0으로 돌아감
            - funcMode == 1
                - Steady ON
                    - Steady는 균형잡는 행동
                - accXYZupdate() → InitConfig.h 파일 안의 함수
                - balancing()
                - GoalPosAll()
            - funcMode == 2
                - stayLow
                - 앉았다 일어났다가 원상태로 돌아감
                - for문으로 0에서 1까지 0.02의 간격으로 standUp 함수 호출
                - 앉기 : standUp(basselCtrl(WALK_HEIGHT, WALK_HEIGHT_MIN, i))
                - 일어나기 : standUp(nasselCtrl(WALK_HEIGHT_MIN, WALK_HEIGHT_MAX, i))
                - 원상태 : standUp(basselCtrl(WALK_HEIGHT,
            - funcMode == 3
                - handshake
                - 뒷다리 굽히고 오른쪽 다리를 들어서 세번 왔다갔다 한 후 원상태로 돌아감
            - funcMode == 4
                - Jump
                - 살짝 뛰었다가 원위치
            - funcMode == 5
                - ActionA
                - 반응안함,,,
            - funcMode == 6
                - ActionB
                - 반응안함,,
            - funcMode == 7
                - ActionC
                - 미등록상태
            - funcMode == 8
                - InitPos
            - funcMode == 9
                - MiddlePos
        - 디버그모드일 경우 LED 색 변경(255, 64, 0)
    - wireDebugDetect()
        - 만약 WIRE_DEBUG가 HIGH로 나오면 debugMode에 들어감
        - 디버그모드일 경우 debugMode = 1
        - debugMode는 app_httpd.cpp에서 온 extern int 형 변수

## WAVEGO.ino

### 헤더

```python
#include "InitConfig.h"
#include "ServoCtrl.h"
#include "PreferencesConfig.h"
#include <ArduinoJson.h>
```

### 변수

- moveFB : -1/0/1 값에 따라 후진/정지/전진
- moveLR : -1/0/1 값에 따라 좌회전/직진/우회전

### 함수

- serialCrtl()
    - Serial 통신이 JSON 형태로 잘 보내왔다면
        - 받아오는 var과 val 값에 따라 동작
            - var == funcMode
                - funcMode 변수 값을 0/1 혹은 val 값으로 변경
            - var == move
                - 부저 울리고 val값에 따라 moveFB 변수 값을 변경하고 시리얼 문자 찍음
                    - 전진(val 1) : moveFB = 1
                    - 좌회전(val 2) : moveLR = -1
                    - 정지(val 3) : moveFB = 0
                    - 우회전(val 4) : moveLR = 1
                    - 후진(val 5) : moveFB = -1
                    - 직진(val 6) : moveLR = 0
            - var == ges
                - val 값에 따라 gestureSpeed(= 2) 만큼 증감
                - gestureOffSetMax(= 15) 가 최대 속도로 속도는 -15 ~ 15로 제한
                - pitchYawRollHeightCtrl(gestureUD, gestureLR, 0, 0) 다음 함수를 통해 속도 반영
            - var == light
                
                val 값에 따라 led0과 led1의 색상을 바꾼다.
                
            - var == buzzer
                - val 값에 따른 부저 ON/OFF
- jsonSend()
- robotThreadings() : 살짝 delay를 걸고 serialCrtl while문으로 실행
- threadingsInit() : robotThreadings를 Thread 걸어서 다중 실행
- setup() : 다양한 setup 함수들 실행
- loop()
    - robotCtrl() / allDataUpdate() / wireDebugDetect() 을 순차적으로 실행

## WebPage.h

- html 파일
    - arduino에서 띄우는 html 파일(192.168.4.1에 뜨는 거)

## app_httpd.cpp

```python
#include <arduino.h>
#include "WebPage.h"

#include "esp_wifi.h"
#include <WiFi.h>
#include "soc/soc.h"
#include "soc/rtc_cntl_reg.h"

#include "dl_lib_matrix3d.h"
#include <esp32-hal-ledc.h>
#include "esp_http_server.h"
#include "esp_timer.h"
#include "esp_camera.h"
#include "img_converters.h"
```

- 와이파이 연결 관련 함수
    - 관련 esp 헤더 포함
- gpio 핀 번호 설정
- getMac(): mac 주소 받아오기
- getIP(): IP 주소 받아오기
- setAP(): 와이파이 ssid, 비번 이용 연결, 내 ip 받아오기
- setSTA(): 와이파이 시작
- getWifiStatus()
    - 와이파이 연결되어 있으면 wifi 모드 2, ip 받아오기
    - 연결 안 되어 있으면 wifi 모드 3, 다시 연결
- wifiInit(): 와이파이 mode1이면 setAP(), mode2면 setSTA
- stream_handler
    - 이전 frame이 있으면 esp의 타이머에서 타임을 리턴 받아 last_frame으로 지정
    - 카메라 연결이 되었다면
        - frame을 jpg로 변환
    - esp가 연결되어 있으면
        - http로 jpg로 변환한 거 보냄
    - 걸린 시간 구하기
    - delay 10
    - res(httpd_resp_send_chunk의 return 값, esp_err_t 타입)를 리턴
- cmd_handler
    - ESP_OK로 통신이 잘 되고 있다면
        - var, val, cmd를 parsing함
        - var, val에 따라서 moveFB, moveLR 처리
            - moveFB: 1 forward 0 FBstop -1 backward
            - moveLR: 1 right 0 LRstop -1 left
        - funcMode는 평소에는 0 funcMode일 때만 1로 설정
- startCameraServer
    - http server 시작하는 함수
    - /로는 index_handler
    - /control로는 cmd_handler
    - /stream으로는 stream_handler get
    - 참고: [https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-reference/protocols/esp_http_server.html](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-reference/protocols/esp_http_server.html)
- webServerInit
    - brown_out 방지
    - camera config에 GPIO, freq, pixel format 지
    - 카메라 초기화
    - wifi 초기화
    - 카메라 서버 시작
