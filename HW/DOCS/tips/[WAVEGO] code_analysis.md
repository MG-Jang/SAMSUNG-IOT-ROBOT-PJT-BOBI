# 코드분석

> 라즈베리파이 
- setup.py
  - 시스템 명령어 
  ``` 
  os.system("명령어") 
  ```
  - line:96
    - 시리얼 통신의 ㅈ
  - line:103
    - opencv 버전 3.4.11.45로 설정
    - 실제로 확인해 보니 3.4.11로 설정 확인
  - line:115
    - numpy 1.21 버전으로 설치

- app.py
  - what is flask?
    - 간단한 API서버를 만드는데 특화되어있는 python web Framework. 즉 web app구동을 위한 함수 모음
- camera_opencv
  - faceCascade: 얼굴인식을 위한 xml 파일 
  - linepos_1
  - linepos_2
- 아두이노
  - initCongig.h
    - 소형 디스플레이에 출력내용
    - 배터리 잔여 전압 출력
