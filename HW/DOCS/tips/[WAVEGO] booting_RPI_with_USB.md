# 라즈베리파이 usb로 부팅하기

1. 준비물
    - 라즈베리os가 깔려있는 micro sd카드
    - 라즈제리os가 설치 되어있는 usb

2. 환경세팅하기
- 먼저 일반적인 microsd 카드로 라즈베리 파이를 켠다.
- 아래 명령어를 통해 패키지 목록을 최신화 해준다.
```
$ sudo apt-get update
$ sudo apt-get upgrade
```

- eeprom의 펌웨어를 업데이트한다.
```py
$ sudo rpi-eeprom-update    #펌웨어 확인
$ sudo rpi-eeprom-update -a   #펨웨어 업데이트
```
- 아래 명령어를 통해 파일이 생성되었는지 확인
    - pieeprom.sig
    - pieerom.upd
    - recovery.bin
```
$ ls /boot 
```
- 이후 정상적으로 설치가 되었다면 재부팅
```
$ sudo reboot
```
- 재부팅후 아래 명령어를 입력하면 Boot_ORDER=0xf41로 변경이 되어있을것이다.
  - 0x1은 sd카드로만 부팅하겠ㄷ나느 뜻
  - oxf41로 부팅하면 usb를 확인후 없으면 sd카드로 부팅
- 이후 라즈베리 파이를 종료시킨후 sd카드를 제거 usb를 연결하여 부팅한다.
- 정상적으로 부팅이 되면 성공한 것이다.