# camera_opencv.py
541줄부터~
```
    elif act == 'up':
        for i in range(1,10):
            robot.lookUp()
    elif act == 'down':
        robot.lookUp()
        robot.lookDown()
    elif act == 'UDstop':
        robot.lookStopUD()
    elif act == 'lookleft':
        for shakeTime in range(1,4):
            for i in range(1,3):
                robot.lookLeft()
            time.sleep(1)
            for i in range(1,3):
                robot.lookRight()
            time.sleep(1)
    elif act == 'lookright':
        # robot.lookRight()
        robot.stayLow()
    elif act == 'LRstop':
        robot.lookStopLR()
```

+ 웹페이지에서 'up'버튼를 실행할 때에 앉기가 작동되도록 한번에 여러번의 **robot.lookUp()** 이 실행되도록 변경
  + 실제로 몇번의 횟수가 적당한지 보고 수정할 것
  + 빠르기는 **<WAVEGO.ino>** 에서 수정 가능
+ 웹페이지에서 'down'버튼을 실행할 때에 고개끄덕임이 작동되도록 **robot.lookUp()** 함수와 **robot.lookDown()** 함수를 순차적으로 호출
  + 고개끄덕임이 너무 빨라서 함수를 몇번 더 호출하거나 sleep을 사용할 것
+ 웹페이지에서 'lookleft'버튼을 실행할 때에 엉덩이 흔들기가 작동되도록 4번을 흔들게끔 **robot.lookLeft()** 함수와 **robot.lookRight()** 함수를 for문에 넣어 출력
  + 부자연스러운 것을 실제로 보고 수정할 것
+ 웹페이지에서 'lookright'버튼을 실행할 때에 stayLow가 작동되도록 **robot.stayLow()** 함수를 추가
  + **[robot.py]** 를 에서 함수를 추가했음


# robot.py
99번째 줄
```
def stayLow():
    dataCMD = json.dumps({'var':"funcMode", 'val':2})
    ser.write(dataCMD.encode())
    print('robot-staylow')
```

+ **<ServoCtrl.h>** 에 적혀있는 funcmode를 지정해주고 형식에 맞게 함수를 추가
  + 잘 작동됨😀