robot.py의 함수를 사용하기 위해 추가
```
import robot
```

토픽 뒤의 메세지의 형태를 forward, backward, left, right같은 경우 on/off로 보냄
+ on일 경우 speedMove를 줘서 움직임
  + speedMove값을 바꾸면 속도를 조절할 수 있을까? 이를 웹에서 조종하게 할 수도 있을듯
+ off일 경우 stop

gesture 토픽을 새로 만들고 행동의 이름(handshake, jump 등등)을 메세지로 보냄
+ 예를 들어 /gesture handshake라면 handshake가 실행