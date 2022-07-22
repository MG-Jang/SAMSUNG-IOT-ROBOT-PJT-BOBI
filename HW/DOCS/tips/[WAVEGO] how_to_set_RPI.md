# Wavego 기반 4족보행 로봇 정리

## 초기 환경설정.
- 라즈베리파이에 os가 설치된 sd카드 또는 usb를 연결(나는 속도와 안정성을 위해 usb3.0을 사용, usb로 부팅하는 법은 라즈베리파이 usb부팅.md를 참고하자)
- rasp pi를 컴퓨터에 연결후 아래와 명령어를 입력하여 환경설정 진행.(VNC, mobaxterm 등 원격 접속 프로그램 사용 or 직접 hdmi 케이블을 통해 연결), 약 10~15분 정도 소요
```
$ sudo git clone https://github.com/waveshare/WAVEGO.git
$ sudo python3 WAVEGO/RPi/setup.py
``` 
- 설치를 마치면 라즈베리파이가 재부팅된다.
- 설치를 마치면 "(env)" 가상환경이 실행되어 있을 것이다.
  - ex):  (env) jang@raspberrypi:~ $

- 추가: 22.7.14 실행결과 env가상환경이 표시 되지는 않는다. 하지만 env가 켜져있는것으로 예상.
  - esp32연결없이 라즈베리파이만 존재한다면 포트포워딩으로 연결이가능(단 esp가 없는 만큼 모터 제어는 불가능, 오직 카메라만 사용 가능)