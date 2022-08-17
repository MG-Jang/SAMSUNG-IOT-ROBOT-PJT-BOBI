# camera_opencv.py

541줄부터~

```
    elif act == 'up':
        for i in range(1,10):
            robot.lookUp()
        for i in range(1,10):
            robot.lookDown()
    elif act == 'down':
        for i in range(1,4):
            robot.lookDown()
        for i in range(1,6):
            robot.lookUp()
        for i in range(1,3):
            robot.lookDown()
    elif act == 'UDstop':
        robot.lookStopUD()
    elif act == 'lookleft':
        for i in range(1,7):
            robot.lookLeft()
        time.sleep(0.5)
        for shakeTime in range(1,3):
            for i in range(1,13):
                robot.lookRight()
            time.sleep(0.5)
            for i in range(1,13):
                robot.lookLeft()
            time.sleep(0.5)
        for i in range(1,7):
            robot.lookRight()
    elif act == 'lookright':
        # robot.lookRight()
        robot.stayLow()
    elif act == 'LRstop':
        robot.lookStopLR()
```

- 'up'버튼을 눌렀을 때 **앉았다 일어나기**가 실행되고자 함
  - for문을 (1,10)까지 돌렸을 때가 가장 최대 앉을 수 있는 각도인 듯 (정확한 각도는 아니지만 육안상으로는 그래보임..!)
- 'down'버튼을 눌렀을 때 **고개 끄덕이기**가 실행되고자 함
  - 고개를 내렸다가 살짝 올린 뒤 원위치 하는 형태로 구현했는데 어색한 느낌,, 더 수정 필요
- 'lookleft'버튼을 눌렀을 때 **엉덩이 흔들기**(춤...?)가 실행되고자 함
  - 왼쪽으로 간다음에 오른쪽으로 두배만큼 가야 흔드는 모양새가 나옴
  - 원위치를 위해 마지막에 오른쪽으로 반정도 움직이는 코드 추가

# WAVEGO.ino

- 아두이노 코드 업로드 전 세팅은 Wavego wiki 참조
- https://www.waveshare.com/wiki/WAVEGO

## initConfig.h

- 아두이노 코드 업로드가 잘되는지 확인을 위해 LCD에 출력되는 문구를 변경
- 201줄 BATTERY -> BATERY
- 잘 출력됨 -> 추후 LCD 문구 변경 가능

## ServoCtrl.h

974번째 줄

```
void functionActionA(){
    for(float i = 0; i<=1; i+=0.02){
        standUp(besselCtrl(WALK_HEIGHT, WALK_HEIGHT_MIN, i));
        GoalPosAll();
        delay(1);
    }
}


void functionActionB(){
    for(float i = 0; i<=1; i+=0.02){
        standUp(besselCtrl(WALK_HEIGHT_MIN, WALK_HEIGHT, i));
        GoalPosAll();
        delay(1);
    }
}


void functionActionC(){
    for(float i = 0; i<=1; i+=0.02){
        singleLegCtrl(3,  besselCtrl(WALK_EXTENDED_X, 0, i), besselCtrl(WALK_HEIGHT, WALK_HEIGHT_MAX, i), besselCtrl(WALK_EXTENDED_Z, -15, i));
        singleLegCtrl(1,  besselCtrl(WALK_EXTENDED_X, 0, i), besselCtrl(WALK_HEIGHT, WALK_HEIGHT_MAX, i), WALK_EXTENDED_Z);

        singleLegCtrl(2,  -WALK_EXTENDED_X, besselCtrl(WALK_HEIGHT, WALK_HEIGHT_MIN-10, i), besselCtrl(WALK_EXTENDED_Z, 2*WALK_EXTENDED_Z, i));
        singleLegCtrl(4,  -WALK_EXTENDED_X, besselCtrl(WALK_HEIGHT, WALK_HEIGHT_MIN-10, i), besselCtrl(WALK_EXTENDED_Z, 2*WALK_EXTENDED_Z, i));

        GoalPosAll();
        delay(1);
    }


    for(float i = 0; i<=1; i+=0.02){
        singleLegCtrl(1,  besselCtrl(0, WALK_RANGE/2+WALK_EXTENDED_X, i), besselCtrl(WALK_HEIGHT_MAX, WALK_HEIGHT_MIN, i), besselCtrl(WALK_EXTENDED_Z, 0, i));

        GoalPosAll();
        delay(1);
    }

    for(int shakeTimes = 0; shakeTimes < 3; shakeTimes++){
        for(float i = 0; i<=1; i+=0.03){
        singleLegCtrl(1,  WALK_RANGE/2+WALK_EXTENDED_X, besselCtrl(WALK_HEIGHT_MIN, WALK_HEIGHT_MIN+30, i), 0);

        GoalPosAll();
        delay(1);
        }
        for(float i = 0; i<=1; i+=0.03){
        singleLegCtrl(1,  WALK_RANGE/2+WALK_EXTENDED_X, besselCtrl(WALK_HEIGHT_MIN+30, WALK_HEIGHT_MIN, i), 0);

        GoalPosAll();
        delay(1);
        }
    }

    for(float i = 0; i<=1; i+=0.02){
        singleLegCtrl(3,  besselCtrl(0, WALK_EXTENDED_X, i), besselCtrl(WALK_HEIGHT_MAX, WALK_HEIGHT, i), besselCtrl(-15, WALK_EXTENDED_Z, i));
        singleLegCtrl(1,  besselCtrl(WALK_RANGE/2+WALK_EXTENDED_X, WALK_EXTENDED_X, i), besselCtrl(WALK_HEIGHT_MIN, WALK_HEIGHT, i), besselCtrl(0, WALK_EXTENDED_Z, i));

        singleLegCtrl(2,  -WALK_EXTENDED_X, besselCtrl(WALK_HEIGHT_MIN-10, WALK_HEIGHT, i), besselCtrl(2*WALK_EXTENDED_Z, WALK_EXTENDED_Z, i));
        singleLegCtrl(4,  -WALK_EXTENDED_X, besselCtrl(WALK_HEIGHT_MIN-10, WALK_HEIGHT, i), besselCtrl(2*WALK_EXTENDED_Z, WALK_EXTENDED_Z, i));

        GoalPosAll();
        delay(1);
    }
}
```

+ **functionActionA** 는 앉기(엎드리기?)
  + 기존 'functionStayLow'함수에서 앉는 부분만 끌어다가 넣음
  + 잘 작동함
+ **functionActionB** 는 일어나기
  + 기존 'functionStayLow'함수에서 일어나는 부분을 끌어다가 넣음
  + 높이 일부 수정
  + standUp()함수를 사용
    + standUp(besselCtrl(현재 위치, 도달할 위치, i))
    + 이런 형식으로 사용
    + 혹시 모르니 숫자말고 WALK_HEIGHT처럼 지정되어 있는 수들을 사용할 것
+ **functionActionC** 는 왼손 악수
  + 기존 'functionHandshake'함수는 오른손 악수
  + 기존에 구현되어 있던 코드를 끌어와서 다리 번호를 바꿈
  + ServoCtrl()함수를 사용
    + singleLegCtrl(다리 번호,  WALK_RANGE/2+WALK_EXTENDED_X, besselCtrl(WALK_HEIGHT_MIN, WALK_HEIGHT_MIN+30, i), 0) 
    + 이런식의 형태를 사용하는데 아직 다른 변수들은 어떻게 계산하는지 모르겠음... 앞의 다리 번호만 수정해봄
    + 함수 정의 : void singleLegCtrl(uint8_t LegNum, double xPos, double yPos, double zPos)


# 시행 착오
+ Handshake를 뒷다리로도 구현하려고 다리 번호를 바꿔봤지만 제대로 동작하지 않음
  + 아마 방향이 바뀌었으니 pos를 다시 지정해줘야하지 않나 싶음
+ 라즈베리파이 코드에서 구현하는 lookUp(), lookDown(), lookLeft(), lookRight() 함수들의 속도를 조정하는 코드는 WAVEGO.ino의 gestureSpeed 값을 바꾸면 될 것으로 추정
  + 여기서 ServoCtrl.h의 'pitchYawRollHeightCtrl()'함수를 사용하여 제어하기 때문에 ServoCtrl.h에서 이 값을 잘 이용하면 action으로도 따로 행동을 구현할 수 있지 않을까 추정
+ 잘못될까봐 무서워서 잘 못건들겟음 ㅜ