---
last modified: 2022-08-17
---
# BoBi tracking target

- 아이 추적을 목표로함

- camera_opencv code modified

- 2208011
  - opencv변경으로 아이추적이 가능한지 확인
  - 동작확인
  - 추적을 위해 인형이 학습된 xml 파일을 사용
- 220813
  - 아이 추적을 완벽히 구현
  - stt와도 동시에 잘돌아가는지 확인
- 220816
  - 초음파 센서를 추가하여 안정성을 높임

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