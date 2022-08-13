# 자율주행 코드

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

### 220812
- camera_opencv <hr>
  - findColor 자율주행 부분

```py
 def findColor(self, frame_image):
        hsv = cv2.cvtColor(frame_image, cv2.COLOR_BGR2HSV)
        mask = cv2.inRange(hsv, colorLower, colorUpper)#1
        mask = cv2.erode(mask, None, iterations=2)
        mask = cv2.dilate(mask, None, iterations=2)
        cnts = cv2.findContours(mask.copy(), cv2.RETR_EXTERNAL,
            cv2.CHAIN_APPROX_SIMPLE)[-2]
        center = None
        if len(cnts) > 0:
            X_LOCK = 0
            Y_LOCK = 0
            self.findColorDetection = 1
            c = max(cnts, key=cv2.contourArea)
            ((self.box_x, self.box_y), self.radius) = cv2.minEnclosingCircle(c)
            M = cv2.moments(c)
            center = (int(M["m10"] / M["m00"]), int(M["m01"] / M["m00"]))
            X = int(self.box_x)
            Y = int(self.box_y)
            error_Y = abs(240 - Y)
            error_X = abs(320 - X)

            # h: 480 w: 840
            # if self.radius < 300:
            #     robot.buzzerCtrl(1, 0)
            #     time.sleep(1)
            #     robot.buzzerCtrl(0, 0)

            #     #robot.foward()
            #     #time.sleep(0.2) 

            # if Y < 240 - CVThread.tor:   #axis y 
            #     # error_Y*CVThread.aspd
            #     robot.lookUp()
            #     # stop motion
            #     time.sleep(0.05)
            #     robot.stopLR()
            #     time.sleep(0.05)
            #     robot.stopFB()
            # elif Y > 240 + CVThread.tor:   #top of range
            #     robot.lookDown()
            #     # stop motion
            #     time.sleep(0.05)
            #     robot.stopLR()
            #     time.sleep(0.05)
            #     robot.stopFB()
            # else:
            #     # stop motion
            #     time.sleep(0.05)
            #     robot.stopLR()
            #     time.sleep(0.05)
            #     robot.stopFB()
            #     Y_LOCK = 1

            if int(self.radius) < 30:
                robot.buzzerCtrl(1, 0)
                time.sleep(0.2)
                robot.buzzerCtrl(0, 0)
                #robot.foward()
                #time.sleep(0.2) 

            if X < 220 : #320 - CVThread.tor:  # X is box's x axis, 320 is plane center 
                #robot.lookLeft()
                robot.lightCtrl('blue', 0)
                robot.left()
                time.sleep(0.2)
                #robot.stopLR()
                print('Turning Right')
            elif X > 420 : #320 + CVThread.tor:
                #robot.lookRight()
                robot.lightCtrl('red', 0)
                robot.right()
                time.sleep(0.2)
                #robot.stopLR()
                print('Turning Left')

            else:
                X_LOCK = 1
                # stop motion
                time.sleep(0.05)
                robot.stopLR()
                time.sleep(0.05)
                robot.stopFB()

            if X_LOCK == 1 and Y_LOCK == 1:
                #robot.buzzerCtrl(1, 0)
                # stop motion
                time.sleep(0.05)
                robot.stopLR()
                time.sleep(0.05)
                robot.stopFB()
                robot.lightCtrl('yellow', 0)
            else:
                #robot.buzzerCtrl(0, 0)
                # stop motion
                time.sleep(0.05)
                robot.stopLR()
                time.sleep(0.05)
                robot.stopFB()
                robot.lightCtrl('magenta', 0)

        else:
            self.findColorDetection = 0
        self.pause()
```