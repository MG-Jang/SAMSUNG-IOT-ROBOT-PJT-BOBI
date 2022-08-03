# 기본적인 동작 흐름
-> 웹에서 행동 버튼 클릭

-> **[webserver.py]** 에서 해당하는 data를 받아와서 **[app.py]** 에 정의되어 있는 **'commnadInput'** 함수를 사용

-> **'commandInput'** 함수에서는 **[camera_opencv.py]** 에 정의되어 있는 **'commandAct'** 를 사용

-> **'commandAct'** 함수에서는 act에 따라 **[robot.py]** 의 행동 함수를 호출

-> **[robot.py]** 에는 행동에 따라 함수들을 정의해놓고 각 함수에서 esp32로 함수에 대한 값을 보냄

-> **<WAVEGO.ino>** 에서는 **[robot.py]** 에서 받은 함수들 별로 var로 받아온 행동 종류에 따라 행동을 수행함

-> 이 중, funcMode로 정의된 행동들은 **<ServoCtrl.h>** 에 정의된 함수들로 구동함(세부적인 로봇 구동은 모두 **<ServoCtrl.h>** 에서 담당)

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