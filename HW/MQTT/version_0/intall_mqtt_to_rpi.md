---
author: Dongwon Kim
date: 2022-07-29
---
# 라즈베리파이에 MQTT 적용하기 & MQTT 주제 설계

## 상태

- windows에서 mosquitto broker 실행
- RPI에서 subscribe
- windows에서 publish
    
    → 잘 됨
    
- RPI에서 subscribe 하는 동시에 windows로 publish
- windows에서 publish하는 동시에 subscribe
    
    → 잘 됨
    

## 환경 세팅

### windows

1. [mosquitto.org/download](http://mosquitto.org/download) 에서 다운로드
2. 방화벽 설정

### RPI

```
sudo apt update
sudo apt full-upgrade
sudo apt install mosquitto
sudo apt install mosquitto-clients
```

## 명령어

- publish
    
    ```
    mosquitto_pub -h "broker 실행중인 ip" -t "토픽" -m 보낼_메시지
    mosquitto_pub -h "broker 실행중인 ip" -t "토픽" -l (메시지 여러개 보낼 수 있음)
    ```
    
- subscribe
    
    ```
    mosquitto_sub -h "broker 실행중인 ip" -t "토픽"
    ```
    

## 주제

```
계정id
	|-- /move
		|-- /forward
		|-- /backward
		|-- /left
		|-- /right
	|-- /
```

- [x]  web → RPI 보행 데이터
- [ ]  web → RPI 새로운 음성 메시지 발생
    
    S3에 저장된 path도 함께
    
- [ ]  RPI → web 새로운 음성 메시지 발생
- [ ]  web → RPI 절전 모드 실행
- [ ]  1계정 1로봇 1디바이스
- [ ]  주제마다 callback 함수 매칭 가능 → 한 주제에 한 함수만 매칭 되는가??
 -[x] js에서도 mqtt사용 가능,
- [ ]  첫 주제는 /로 시작하지 않고 주제 중간에 공백이 없는가?
- [ ]  mqtt 수신이 어떤 식으로 진행되는지 확인
    - 새로운 거 들어오면 인식해서 바로 callback?
    - 계속 메시지 쌓이나?
    - 만약 쌓이고 새로운 게 들어왔는지는 알아서 확인이라면 timestamp를 추가해야 할 수도
