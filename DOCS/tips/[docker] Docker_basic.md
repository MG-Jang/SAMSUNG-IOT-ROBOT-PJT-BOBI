---
author: Dongwon Kim
date: 2022-07-27
excerpt: "container, img, dockerfile, docker config, docker hub, cmd"
---

## Docker 기초

- container는 host os와 독립적으로 실행되는 process
- container image는 컨테이너에서 사용되는 isolated custom filesystem→ dependency, config, script, binary, env var, default cmd, metadata 등 모든 app 실행에 필요한 걸 포함
- docker desktop 설치할 것
- dockerfile: docker engine에서 실행을 원하는 cmd 모음
    
    ```docker
    FROM node:12.16.3
    
    WORKDIR /code
    
    ENV PORT 80
    
    COPY package.json /code/package.json
    
    RUN npm install
    
    COPY . /code
    
    CMD ["node", "src/server.js"]
    ```
    
    - FROM으로 시작
        - base image를 지정함
        - 예) node로 설정하면 node, npm 다 설정되어 있음
    - WORKDIR: working directory
    - ENV: variable(environment var 등)
    - COPY package.json을 /code/package.json에 복사
    - RUN: run 뒤에는 docker execute함
    - CMD: 시작했을 때 실행해야 할 cmd
- hub에 공유하기
    - group에게 access 할 수 있도록 하기 등 가능
    - auto build, ci/cd 가능
    - repo에 image 넣기
    - github push될 때마다 auto build 가능
    - cmd에서 docker repo에 push하면 됨
    - docker tag hello-world pmckee/hello-world로 이름 다시 지어서 올리면 됨
    - docker pull해서 img 가져올 수 도 있음

### 명령어

- docker build: 이미지 빌드
    - tag: 이름 짓기
    - file: docker 파일이 어디에 있는지 얘기
- docker run [image 이름]
    - -d: background run 하게 해줌
- docker start [container 이름]: container 실행
- docker stop [container 이름]: 해당 container 중지
    - stop을 하면 container는 유지하되 SIGTERM 보내서 run을 멈춤, 새로운 이미지에 해당 container의 상태를 저장 가능
- docker rm [이름]: 해당 container 삭제
    - container 지워버림, state 없어지므로 새로운 이미지에 저장 불가
    - 하면 docker ps -a해도 안 나옴
    - stop을 한 후에 rm 해야 함(안 그러면 zombie process 될 가능성 있음)
- docker images: 이미지 list 보기
- docker ps: 실행 중인 container list 보기
- docker ps -a: 존재하는 container list 보기
- docker rmi [image 이름]
    - img 삭제
- docker logs [이름]
    - background에서 실행되고 있는 거 log 볼 수 있음
    - -f 하면 계속 볼 수 있음

## Docker-compose

- 여러 컨테이너 관리하기 힘들 수 있음 → docker-compose.yml 사용
    
    ```docker
    # docker-compose.yml
    version: '2'
    
    services:
    	web:
    		build:
    			context:
    			dockerfile: Dockerfile
    		container_name: web
    		ports:
    			- "8080:80"
    	db:
    		image: mongo:3.6.1
    		container_name: db
    		volumes:
    			- mongodb:/data/db
    			- mongodb_config:/data/configdb
    		ports:
    			- 27017:27-17
    		command: mongod
    
    volumes:
    	mongodb:
    	mongodb_config:
    ```
    
    - service가 지금 web 하나 있음
    - context: dockerfile의 path와 비슷
    - 도커 파일 지정, container 이름과 포트 지정 가능
    - docker-compose가 있는 dir에서 docker-compose up -d 하면 background로 돌아감
    - _로 img와 container 이름 이어줌(hello-world_web)
    - docker-compose down으로 stop
        - ps, ps -a 모두에서 없어짐

## 참조
- [How to Get Started with Docker](https://youtu.be/iqqDU2crIEQ)
- [get started](https://docs.docker.com/get-started/)