---
author: Dongwon Kim
date: 2022-08-02
---

## issue
- 상황
    - windows10 에서 mosquitto broker 실행
        - conf 파일 세팅
            - listener 1883 0.0.0.0
            - allow_anonymous true
        - mosquitto -c mosquitto.conf -v 로 conf 파일 적용하여 broker 시작
        - 방화벽 인바운드 규칙에서 1883 포트 개방
        - 혹시 몰라 아웃바운드 규칙도 1883 포트를 개방해보았으나 결과는 동일
        - 내부 ip, 외부 ip 모두 windows 내에서는 잘 동작함
        - windows에서 subscribe를 외부 ip, 라즈베리파이에서는 내부 ip
    - RPI
        - RPI는 windows10 핫스팟에 연결되어 있음
        - 무선 LAN 어댑터 로컬 영역 연결 즉 내부 ip를 통해 소통하면 RPI ↔ windows 잘 됨
        - windows의 공인 ip를 통해 소통하면 RPI에서 windows에 있는 broker에 연결이 안됨
        - netstat -ano 를 통해 확인해 본 결과
            - RPI → windows connect를 시도하고 있음에도 1883 포트가 listen에서 established로 변경되지 않음
            - 1883 포트는 모든 ip 주소에 대해 항상 listen 상태임
- 예상 되는 원인
    - 라즈베리파이에서 외부 ip를 통해 publish, subscribe 하려고 할 때 broker에 log가 뜨지 않는 것으로 봐 라즈베리파이에서 해당 ip로 연결 자체가 안 되는 듯
    - windows 혹은 라즈베리파이의 방화벽의 문제????

→ windows 방화벽 문제라고 판단하여 **EC2에서 바로 진행**하기로 함
## EC2

- 라즈베리파이에서 했던 것처럼 mosquitto, mosquitto_client 설치
- localhost로 테스트할 때는 잘 됨
- sudo nano /etc/mosquitto/conf.d/default.conf
    
    ```
    listener 1883
    allow_anonymous true
    ```
    
- sudo ufw allow ssh
- sudo ufw allow 1883

```
$ sudo /etc/init.d/mosquitto stop
$ mosquitto
```

```
$ mosquitto_sub -h 'i7a208.p.ssafy.io' -t 'testuser/hello'
$ mosquitto_pub -h 'i7a208.p.ssafy.io' -t 'testuser/hello' -m hello_from_ec2
$ mosquitto_sub -h 'i7a208.p.ssafy.io' -t 'testuser/hello'
$ mosquitto_sub -h 'i7a208.p.ssafy.io' -t 'testuser/hello' -m hello_from_rpi
```

- mobaxterm에 나오는 ip를 이용해서 -h를 설정하면 안되고 hostname을 사용하여 진행하면 rpi ↔ ec2 모두 잘 됨
    - paho_mqtt_sub를 rpi에서 testing code를 ec2에서 실행했을 때 잘 됨