---
author: Dongwon Kim
date: 2022-08-10
---
# Flask + react 연결

## 문제

- 라즈베리파이 안에서 flask에서 쏴주기 때문에 flask에서 쏴주는 5000 포트에 ec2, 즉 외부에서 접속을 할 수 있어야 한다
- 라즈베리파이는 windows에 핫스팟으로 연결되어 있기 때문에 windows에서 포트포워딩을 rpi:5000 ↔ [localhost:5001](http://localhost:5001) 을 진행했다
    
    `$ netsh interface portproxy add v4tov4 listenport=5001 listenaddress=0.0.0.0 connectport=5000 connectaddress=[rpi hotspot ip]` 
    
- windows에서 5001 포트에 접속하면 라즈베리파이 화면을 확인할 수 있다.
- windows의 5001 포트를 방화벽에서 열음
- windows의 공인 ip:5001 로 접속할 때 접속이 안됨
    - 아래 상황 표 참고
    - 카페에서 진행하여 windows ↔ 외부망 사이 포트포워딩이 안 됨
    - [ ]  집에서 iptime으로 windows 내부 ip:5001를 공인 ip:5001 로 포트포워딩 해서 진행해보기
        
        → 공인 ip:5001 포트에서 확인이 가능하면 성공
        
        → 공인 ip:5001 포트에서 값을 가져와 [flask + react 연결 예제](https://medium.com/@jadomene99/integrating-your-opencv-project-into-a-react-component-using-flask-6bcf909c07f4)  step4에 적힌 대로 react에서 진행해보기
        
        → 만약 성공한다면 끝!!
        

## 상황
```
|   RPI  |             | windows |             | 외부망 |
|        |   hotspot   |         |    network  |        |
|  port  |     <-->    | port    |    <-X->    |  port  |
|  5000  |             | 5001    |             |  5001  |
```