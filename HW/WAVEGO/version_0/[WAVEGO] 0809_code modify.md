# 코드 수정 및 적용 후 출력

### 220809
- camera_opencv <hr> 
  - speedMove = 100 -> 50으로 변경
    - 속도 변화 없음. 
  - findColor
    - x 축기준으로 고개를 좌우로 흔드는것을 좌우로 이동하는 것으로 변화

        ```
       if X < 320 - CVThread.tor:
                #robot.lookLeft()
                robot.left(speedMove)
            elif X > 320 + CVThread.tor:
                #robot.lookRight()
                robot.right(speedMove)
        ```
        - 멈추지 않고 계속해서 오른쪽 또는 왼쪽으로 이동.