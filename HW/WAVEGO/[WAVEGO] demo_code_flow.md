# 기본적인 동작 흐름
### 1. 웹에서 행동 버튼 클릭

-> **[webserver.py]** 에서 해당하는 data를 받아와서 **[app.py]** 에 정의되어 있는 **'commnadInput'** 함수를 사용

-> **'commandInput'** 함수에서는 **[camera_opencv.py]** 에 정의되어 있는 **'commandAct'** 를 사용

-> **'commandAct'** 함수에서는 act에 따라 **[robot.py]** 의 행동 함수를 호출

-> **[robot.py]** 에는 행동에 따라 함수들을 정의해놓고 각 함수에서 esp32로 함수에 대한 값을 보냄

-> **<WAVEGO.ino>** 에서는 **[robot.py]** 에서 받은 함수들 별로 var로 받아온 행동 종류에 따라 행동을 수행함
+ move
  + moveFB, moveLR의 값을 행동에 따라 1, 0, -1로 바꿈
  + moveFB
    + -1 : 후진
    + 0  : 정지
    + 1  : 전진
  + moveLR
    + -1 : 좌회전
    + 0 : 정지
    + 1 : 우회전
+ funcMode
  + 각 funcMode 값에 따라 **<ServoCtrl.h>** 에 정의된 함수들을 구동함(세부적인 로봇 구동은 모두 **<ServoCtrl.h>** 에서 담당)
+ ges
  + gestureUD, gestureLR의 값을 행동에 따라 +2, -2를 하여 값을 조절
  + -gestureOffsetMax <= gestureUD, gestureLR >= gestureOffsetMax
  + gestureUD
    + +2 : lookUp
    + -2 : lookDown
  + gestureLR
    + +2 : lookRight
    + -2 : lookLeft
  + `pitchYawRollHeightCtrl(gestureUD, gestureLR, 0, 0);`
+ light
+ buzzer

### 2. 앱에서 버튼 클릭

-> **<WebPage.h>** 에 지정된 **<ServoCtrl.h>** 의 gesture 및 move를 실행함

-> gesture의 경우 funcMode 값에 따라서 지정된 함수를 실행함
## **[robot.py]** 에서 정의된 행동
+ move
  + forward
  + backward
  + left
  + right
  + stopLR
  + stopFB

+ ges
  + lookUp
  + lookDown
  + lookStopUD
  + lookLeft
  + lookRight
  + lookStopLR

+ funcMode
  + steadyMode
  + jump
  + handShake
  
+ light
  + lightCtrl
  
+ buzzer
  + buzzerCtrl
