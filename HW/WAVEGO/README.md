---
last modified: 2022-08-18
---
# DemoCode
코드 동작 원리는 [demo_code_flow](./%5BWAVEGO%5D%20demo_code_flow.md)에서 확인

# Arduino
라이브러리 및 세부 세팅은 [wiki](https://www.waveshare.com/wiki/WAVEGO) 참조
## WAVEGO.ino
+ ges 부분에 정면을 보는 함수인 lookFront를 위한 case 추가
    + `case 7: gestureUD = 0; gestureLR = 0; break;`
## ServoCtrl.h
919줄 부터 함수 추가
### 가능한 행동 함수 목록
+ functionStayLow
+ functionHandshake
+ functionJump
+ functionSit
+ functionStandUp
+ functionRightHand
+ functionLeftHand
+ functionLower
+ functionUpper

## WebPage.h
+ 각 행동 별 함수를 실행시켜보기 위해서 안쓰는 버튼에 각각의 funcMode가 연결되도록 할당
# RPi
## robot.py
+ [WAVEGO.ino](#wavegoino)에서 추가해 놓은 행동 함수들의 funcMode 번호에 따라서 이를 robot.py에도 함수로 추가해놓음
### 구현된 함수 목록
+ stayLow
+ sit
+ standUp
+ leftHand
+ rightHand
+ lower
+ upper
+ ok
    + 함수 직접 구현
+ dance
    + 함수 직접 구현

### ⚠주의 사항
+ **[robot.py]** 의 탭 간격이 문제가 있는지 함수를 직접 구현하는 경우에 원하는 대로 동작하지 않음
+ **<ServoCtrl.h>** 에서 `pitchYawRollHeightCtrl` 함수가 for문 안에서 delay를 줬을 때 반복해서 실행되지 않음
    + delay가 모두 합쳐져서 실행된 뒤에 `pitchYawRollHeightCtrl` 함수가 한번에 실행됨(속도 조절이 불가능ㅜㅜ)