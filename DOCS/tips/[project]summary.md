# 공통프로젝트 정리

> 개요 
- 싸피 2학기 공통프로젝트
- 주제: 아이 돌봄이 로봇 보비
- 개발 목적: 최근 맞벌이 가구가 늘면서 3~ 8세의 아이가 혼자 있는 시간이 늘어나 고있다. 하지만 어린이 집에 계속 맡겨 두는것도 가격적으로 부담이 적지 않다. 따라서 로봇이 이를 대체 한다면 장기적으로 봤을때 비용이 절약 될 수 있다. 뿐만 아니라 로봇이 아이와 함께 놀며 아이가 외로움을 느끼지 않도록 도와준다.
- 특징:
  - rspberry pi4
  - esp32
  - servo motor 12개
  - rpi4 <-> esp32 간 uart통신을 함. 따라서 일부처리는 esp32에서 함으로서 rpi4 성능을 유지 할 수 있다.
- 동작 프로세스: 
  - 부모는 휴대폰을 이용하여 아이의 모습을 실시간으로 관찰이 가능하다.
  - 아이의 모습을 영상으로 찍어 클라우드에 저장하여 아이의 노는 모습이 담긴 영상을 평생 간직 할 수 있다.
  - 로봇에 친밀도 시스템을 적용하여 아이가 부모님이 없더라도 불안해 하지 않고 로봇과 함께 친밀감을 쌓으며 잘 지낼 수 있게 한다.

> 사용 툴 
  - git flow (코드 모음)
  - jira (한일 할일 이슈 관리)
  - notion (아이디어 스케치 및 자료 공유)
  - mattermost(메신저 및 공지)
  - docker

> 협업 툴 세부 정리 

- git flow
  - git flow
  - branch를 용도에 맞게 정리
      - master: 최상위 branch
      - release: 배포한 버전
      - develop: 개발하고 있는 버전
      - feature: 세부 구현 모듈
  - commit 내용을 규격화하여 팀원간 어떤 내용을 추가하였는지 한눈에 파악 가능하도록 함.
    - ex) 
- jira
    - 한일 할일 이슈 3가지파트로 나누어 다른 팀원이 어떤 파트를 끝냈고 어떤 파트를 진행해야하는지 한눈에 볼 수 있도록 하는 툴
    - 각각의 이슈에 번호를 붙여 git에 commit을 하는 경우 번호를 함께 작성하여 어떤 이슈에 대한 코드인지 한눈에 볼 수 있도록 정리

- notion
  - 일정, 업무, 데이터, 프로젝트 등을 효율적으로 관리 할 수 있는 협업툴
  - ex) 브레인 스토밍, 아이디어 해커톤, 외형 논의, 기술스택 정하기 등등

- mattermost
  - 메세지를 적고 중요 공지등을 올리는 방식으로 활용
  - git 과 jira를 연동하여 새롭게 commit또는 update된 내용을 실시간으로 확인 가능
  
> 사용 기술 스택 & 하드웨어 
- iot
  - Rspberry pi 4 
  - opencv
  - yolo 
  - 아두이노ESP32(로봇 주행관련)
- 웹
  - front-end
    - html5, 바닐라 js, pwa
    - 웹페이지로 구현(어플리케이션은 아님)
    - figma(웹페이지 기초적인 틀을 잡음)
  - back-end
    - 장고
  - DW
    - AWS, 유튜브 스트리밍
    - ERD(데이터 흐름도)
  
> 코드 컨밴션
- 코드 컨밴션이란? 
  - 코드 컨밴션이란 팀원간 코드 분석을 하는 경우 한눈에 알아 볼 수 있도록 코드 레이아웃 규칙을 정하는 것이다. 예를 들면
  ```C++
  for(int i = 0 ; i = 5 ; i ++){
    cout << "HI"
  }

  for(int i = 0 ; i = 5 ; i ++)
  {
    cout << "HI"
  }
  ```
  둘의 출력은 동일하지만 코드 모습이 다르다. 이를 통일하는 작업을 코드 컨밴션이라 한다. 코드 컨밴션은 google의 코드 컨밴션과 동일하게 설정 하였다.
## python <hr>

### 특징

  - PEP8 코드컨벤션 적용
  - vs코드 툴을 사용 
  - 코드 들여쓰기를 할때 tap대신 띄어쓰기를 사용한다. 이유는 python코드의 경우 C와 다르게 괄호대신 들여쓰기로 코드를 구성한다. 이때 tap을 사용하는 사람과 띄어쓰기를 들여쓰기로하는 사람의 혼동을 줄이기 위해서 띄어쓰기로 통일을 한것이다.(띄어쓰기로 하면 귀찮긴하지만 오류 확률이 tap보다 감소한다.)
  - vs 코드 setting 을 마친후 alt+shift+f 를 하면 알아서 레이아웃을 맞춰 준다.
<hr>

### setting 방법 
  
  1.  vs코드 왼쪽 우측 하단 톱니 바퀴를 누른다.
  2. setting를 들어간다.
  3. 검색창에 json을 검색
  4. JSON:schemas 에서 Edit in settings.json 클릭
```py
{
    "[python]": {
        "editor.defaultFormatter": "ms-python.python"
    },
    "workbench.colorTheme": "Default Dark+",
    "window.zoomLevel": 1,
    "json.schemas": [
        
    
    ]
}
```
  5. 위코드로 변경 후 저장 
  6. py 코드 아무코드나 들어가서 alt+shift+f 입력
  7. 무언가 설치를 하겠습니까 뜰떄 '예' or yes
  8. 이후 코드를 작성후 alt+shift+f를 누르면 자동으로 레이아웃이 변경
## C code <hr>

### 특징
  - K&R 방식 사용(google 방식)
  - visiual stdio를 사용

### visiual stdio 세팅 방법

  1. visual studio에서 도구 → 옵션 → 텍스트 편집기 → C/C++ → 서식 → 일반 → 기본 서식 스타일을 Visual Studio에서 Google로 변경
  1. c++ -> 탭 에서 탭 크기를 2로 변경해야 함

  ### 규칙
- typedef는 LinkedList 형식의 PascalCase
- constant 앞에는 k를 붙이고 kPascalCase
- struct 구성 요소는 lower_case
- 함수 이름은 PascalCase
- 지역 변수는 lower_case
- 줄이 길어서 여러 줄에 쓸 때는 논리 연산자 다음에 \n, 첫 줄에 맞춤
- if 쓸 때 이전에 return, break, continue 썼으면 그 뒤에 else 쓰지 말것
- func declare에서 길어질 때는 인자 별로 , 다음에 \n하고 첫 줄에 맞춤, 함수 호출도 동일, 함수 정의도 동일

> ISSUE

- 220710: 라즈베리파이와 esp32간 uart통신 문제 발생
  - 해결방안: 라즈베리파이에 충분한 전력이 공급되지 못해 전압차가 발생하지 않아 신호를 정확히 판단하지 못함. 추가적인 전력을 라즈베리파이에 공급하여 문제 해결
- 참고자료: wavego_PC connect issue