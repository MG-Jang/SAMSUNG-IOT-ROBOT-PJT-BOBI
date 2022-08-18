## 정리

- 객체 팔로잉을 구현하기 위해서는 `camera_opencv.py` 파일만 수정하면 될 듯 하다.
- 테스트를 통해 수치값들을 조정해야 한다.

## app.py

- import camera_opencv
- flask를 이용한 web app 구동을 위한 함수 모음
- route 설정, class webapp
- flask의 ip, port 등 설정
- Class webapp
  - commandInput : 로봇 동작 명령어 전달(commandAct)
  - modeselect : 모드 변경(modeSelect, CVMode)
  - colorFindSet
  - sendIP : upperIP

## camera_opencv.py

- 얼굴 감지 코드 위주로 정리

### 변수

- faceCascade : 학습된 데이터를 이용하여 검출

### 함수 & Class

- class BaseCamera를 사용
- class CVThread
  - mode
    - mode, img 설정
  - elementDraw
    - CVMode에 따라 text, 사각형 img에 그림
    - faceDetection, findColor, findlineCV, watchDog
    - `faceDetection` : 검출된 얼굴이 있을경우 텍스트 및 사각형 출력
  - faceDetectCV
    - faceCascade.detectMultiScale
      ```python
      **cv2.CascadeClassifier.detectMultiScale(image, scaleFactor=None, minNeighbors=None, flags=None, minSize=None, maxSize=None) -> result**
      ```
      - image: 입력 영상 (cv2.CV_8U)
      - scaleFactor: 영상 축소 비율. 기본값은 1.1.
      - minNeighbors: 얼마나 많은 이웃 사각형이 검출되어야 최종 검출 영역으로 설정할지를 지정. 기본값은 3.
      - flags: (현재) 사용되지 않음
      - minSize: 최소 객체 크기. (w, h) 튜플.
      - maxSize: 최대 객체 크기. (w, h) 튜플.
      - result: 검출된 객체의 사각형 정보(x, y, w, h)를 담은 numpy.ndarray. shape=(N, 4). dtype=numpy.int32.
    - 얼굴 검출 시 빨강 LED, 부저 ON
    - 검출 못할 시 파랑 LED, 부저 OFF
  - pause
    - event thread 내부 flag를 0으로 세팅
  - resume
    - event thread 내부 flag를 1로 세팅
  - run
    - CVMode에 따라 세팅
    - none을 제외한 모든 모드는 CVThreading 변수를 1로 세팅 후 0으로 바로 세팅
- class Camera
  - `frames` : 해당 함수를 통해 카메라 해상도 변경가능 (현재 640 x 480) → [참고](https://docs.opencv.org/3.4/d4/d15/group__videoio__flags__base.html#gaeb8dd9c89c10a5c63c139bf7c4f5704d)
  - CVThread 클래스 시작
- def commandAct
  - 동작 명령어 전달

### 정리

- Camera Class에서는 카메랑 해상도 및 frame 세팅만 건드려보기
- 웹에서 영상인식 버튼 클릭하면 modeSelect 변수가 faceDetection이 된 후 CVThread 클래스의 CVMode가 faceDetection으로 imgCV 변수에 카메라 사진 저장
- CVThread의 elementDraw 함수에서 CVMode가 faceDetection 일 때, 카메라에 찍힌 사진에 텍스트 및 얼굴검출 사각형 출력

### 자동 주행 변경 코드

- camera_opencv.py에서 수정 및 중요하다고 생각되는 부분
- 객체 팔로잉 코드
- 테스트 할 때 부저는 끄고 하기

```python
# 원래 코드에서 90번째 줄
def elementDraw(self, imgInput):
        if self.CVMode == 'none':
            pass

        elif self.CVMode == 'faceDetection':
            if len(self.faces):
                if len(self.faces) == 1:
                    cv2.putText(imgInput, '1 Face Detected', (40, 60),
                                CVThread.font, 0.5, (255, 255, 255), 1, cv2.LINE_AA)
                else:
                    cv2.putText(imgInput, '%d Faces Detected' % len(
                        self.faces), (40, 60), CVThread.font, 0.5, (255, 255, 255), 1, cv2.LINE_AA)
            else:
                cv2.putText(imgInput, 'Face Detecting', (40, 60),
                            CVThread.font, 0.5, (255, 255, 255), 1, cv2.LINE_AA)
            for (x, y, w, h) in self.faces:
                # 객체 발견시 객체 주위에 박스를 출력하기 위한 좌표 생성
                cv2.rectangle(imgInput, (x, y), (x+w, y+h), (64, 128, 255), 2)
                # 박스의 정중앙[(x+x+w)/2]이 영상 해상도(x축 640 추정)의 반보다
                # 크면 우회전 작으면 좌회전
                # 확인해야할 것! 첫째 영상의 x축이 640인지 -> text를 해당 좌표에 띄워서 확인해 보는 방법
								# 코드 분석을 해봤을 때, speedMove 값을 변화해도 변화만큼의 서보모터 동작은 못할 거라 보인다.
                # 따라서, 동작 명령어를 여러분 call 할지 고민, facedection이 계속 실행되면 계속 따라 다닐수도
                # 하지만, 객체가 멈추고 있다면 초음파센서로 객체와 가까워지면 정지를 하도록 해야할듯
                if x+w/2 > 320 + 100:
                    robot.forward(speedMove)
                    robot.right(speedMove)
                elif x+w/2 < 320 - 100: # 테스트를 해보며 320에서 값을 얼만큼 줄이지 생각
                    robot.forward(speedMove)
                    robot.left(speedMove)
								# 100 만큼 값을 줄이지 않으면 로봇 행동 코드가 너무 많이 실행되기 떄문에 조정
								# 혹은 cnt 변수를 만들어서 cnt가 10이 되면 로봇 행동 함수 실행 후 cnt 0으로 초기화
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f2689265-9dec-4fcb-9297-aeb713da578a/Untitled.png)

- 해상도 및 fps 설정 코드

```python
# 원래 코드에서 486번째 줄
def frames():
        camera = cv2.VideoCapture(Camera.video_source)
        camera.set(3, 640) # 카메라 영상 넓이 640으로 세팅
        camera.set(4, 480) # 카메라 영상 높이 480으로 세팅
        if not camera.isOpened():
            raise RuntimeError('Could not start camera.')
```

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
    - client에게 새로운 frame이 들어왔다고 신호를 줌
    - 10초 동안 어떤 client도 frame을 요구하지 않으면 자동 종료되는 부분은 주석 처리 되어 있음
