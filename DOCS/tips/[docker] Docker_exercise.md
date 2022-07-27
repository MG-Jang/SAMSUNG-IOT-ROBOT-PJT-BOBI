---
author: Dongwon Kim
date: 2022-07-27
excerpt: "env setting, img build&run, connect DB, docker compose, CI/CD with github"
---

## docker 실습

- 사용 중인 docker 버전 확인(`$ docker version`)
    - docker desktop을 실행해야만 확인 가능
    
    ```
    Client:
     Cloud integration: v1.0.25
     Version:           20.10.16
     API version:       1.41
     Go version:        go1.17.10
     Git commit:        aa7e414
     Built:             Thu May 12 09:17:07 2022
     OS/Arch:           windows/amd64
     Context:           default
     Experimental:      true
    
    Server: Docker Desktop 4.9.0 (80466)
     Engine:
      Version:          20.10.16
      API version:      1.41 (minimum version 1.12)
      Go version:       go1.17.10
      Git commit:       f756502
      Built:            Thu May 12 09:15:42 2022
      OS/Arch:          linux/amd64
      Experimental:     false
     containerd:
      Version:          1.6.4
      GitCommit:        212e8b6fa2f44b9c21b2798135fc6fb7c53efc16
     runc:
      Version:          1.1.1
      GitCommit:        v1.1.1-0-g52de29d
     docker-init:
      Version:          0.19.0
      GitCommit:        de40ad0
    ```
    
- `docker run -dp 80:80 docker/getting-started` 진행 후 [localhost:80](http://localhost:80) 접속하면 getting started 화면 보기 가능
- Docker Desktop을 설치했다면 BuildKit 사용이 default이므로 따로 설정할 필요 없음
1. local machine에 실습할 dir 하나 생성
2. anaconda로 실습할 가상 환경 생성
3. 실습 dir에서 anaconda 가상 환경으로 진행
    - cmd에서는 grep 명령어가 사용되지 않으므로 bash로 변경했고 bash에서 anaconda 사용하는 방법은 참조한 페이지 참조
    
    ```
    pip3 install Flask
    pip3 freeze | grep Flask >> requriements.txt
    touch app.py
    ```
    
    ```python
    from flask import Flask
    app = Flask(__name__)
    
    @app.route('/')
    def hello_world():
        return 'Hello, Docker!'
    ```
    
    - `python -m flask run` 으로 실행(python3는 안됐었음)
        - localhost:5000에서 확인 가능
4. image build
    - Dockerfile을 app.py와 동일한 dir에 만들기
    
    ```python
    # syntax=docker/dockerfile:1
    
    FROM python:3.8-slim-buster
    
    WORKDIR /app
    
    COPY requirements.txt requirements.txt
    RUN pip3 install -r requirements.txt
    
    COPY . .
    
    CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]
    ```
    
    - `docker build --tag python-docker` 로 이름이 python-docker인 이미지 만들기
5. image run
    - `docker run -p 8000:5000 python-docker` 로 image를 container에서 run
        - [localhost](http://localhost):5000에 접속하여 결과 확인 가능
    - docker stop [container name]으로 container 중지하기
    - docker rm [container name]으로 container 삭제
6. DB 연결
    - mysql, mysql_config라는 volume을 만들어서 container를 삭제해도 유지되는 persistent DB, config를 담을 volume를 만듦
    - app과 DB가 소통하는 network를 따로 만듦(user-defined bridge network)
        
        ```python
        docker run --rm -d -v mysql:/var/lib/mysql \
          -v mysql_config:/etc/mysql -p 3306:3306 \
          --network mysqlnet \
          --name mysqldb \
          -e MYSQL_ROOT_PASSWORD=p@ssw0rd1 \
          mysql
        ```
        
        - -e: 환경 변수 설정
        - —rm: container 종료할 때 컨테이너 관련 리소스도 완전 삭제(일회성 container)
        - -d: background 실행
        - -v: volume 연결
        - -p: host machine에서 container에서 보고 있는 포트로 접속할 수 있게 함(설정하지 않는다면 [localhost:5000](http://localhost:5000) 등 host machine에서 확인 불가)
        - —network: 해당 network 사용
    - mysql 이 잘 설치되었는지 확인
        
        `winpty docker exec -ti mysqldb mysql -u root -p` 
        
        winptysms git bash에서 docker 내부에 접속할 때 사용하는 명령어
        
7. docker compose
    - 여러 개의 container를 한 번에 실행
    - 옵션 저장 가능
    - app.py가 있는 dir에 docker-compose.dev.yml 파일을 만들고 저장
        
        ```python
        version: '3.8'
        
        services:
         web:
          build:
           context: .
          ports:
          - 8000:5000
          volumes:
          - ./:/app
        
         mysqldb:
          image: mysql
          ports:
          - 3306:3306
          environment:
          - MYSQL_ROOT_PASSWORD=p@ssw0rd1
          volumes:
          - mysql:/var/lib/mysql
          - mysql_config:/etc/mysql
        
        volumes:
          mysql:
          mysql_config:
        ```
        
    - `docker-compose -f docker-compose.dev.yml up --build` 를 통해 image를 컴파일 하고 container 시작
8. 최종 working dir tree
    
    ```docker
    python-docker
    	|-- app.py
    	|-- docker-compose.dev.yml
    	|-- Dockerfile
    	|-- requirements.txt
    ```
    
9. docker github와 연동하여 CI/CD 진행
    - 앞선 실습 내용과 무관
    - SimpleWhaleDemo repo를 fork하여 진행
    - repo→ settings → secrets → actions → new secret 에 아래 두 secret 만듦
        - DOCKER_HUB_USERNAME, docker hub 아이디
        - DOCKER_HUB_ACCESS_TOKEN, docker hub에서 발급 받은 Personal Access Token
    - actions → enable action 한 후 새로운 action 만들기
        - fork한 repo에 이미 yml 파일이 2개 존재하는데 삭제 하고 진행함
        
        ```
        name: CI to Docker Hub
        
        # Controls when the workflow will run
        on:
          # master branch에 push 했을 때만 action 진행
          push:
            branches: [ "master" ]
        
          # Allows you to run this workflow manually from the Actions tab
          workflow_dispatch:
        
        # A workflow run is made up of one or more jobs that can run sequentially or in parallel
        jobs:
          # This workflow contains a single job called "build"
          build:
            # build를 가장 최신 Ubuntu에서 진행하도록 설정
            runs-on: ubuntu-latest
        
            # Steps represent a sequence of tasks that will be executed as part of the job
            steps:
        			# $GITHUB_WORKSPACE 아래 있는 repo 체크
              - name: Check Out Repo 
                uses: actions/checkout@v2
              
              # optimize 위해 cache 사용
              - name: Cache Docker layers
                uses: actions/cache@v2
                with:
                  path: /tmp/.buildx-cache
                  key: ${{ runner.os }}-buildx-${{ github.sha }}
                  restore-keys: |
                    ${{ runner.os }}-buildx-
        
              # PAT 이용 docker hub 로그인
              - name: Login to Docker Hub
                uses: docker/login-action@v1
                with:
                  username: ${{ secrets.DOCKER_HUB_USERNAME }}
                  password: ${{ secrets.DOCKER_HUB_ACCESS_TOKEN }}          
              
              # BuildKit 사용 Builder 설정
              - name: Set up Docker Buildx
                id: buildx
                uses: docker/setup-buildx-action@v1
                
              - name: Build and push
                id: docker_build
                uses: docker/build-push-action@v2
                with:
                  context: ./
                  file: ./Dockerfile
                  builder: ${{ steps.buildx.outputs.name }}
                  push: true
                  tags:  ${{ secrets.DOCKER_HUB_USERNAME }}/simplewhale:latest
                  cache-from: type=local,src=/tmp/.buildx-cache
                  cache-to: type=local,dest=/tmp/.buildx-cache
              - name: Image digest
                run: echo ${{ steps.docker_build.outputs.digest }}
        ```
        
        - master에 push가 아니라 특정 tag를 달아서 github에 올릴 때만 Docker Hub에 push 하도록 할 수 있음(이렇게 위 코드 중 on 부분을 수정)
            
            ```
            on:
            	push:
            		tags:
            			-"v*.*.*"
            ```
            
            - `git tag -a v1.0.2` `git push origin v1.0.2` 를 이용하여 특정 tag를 붙여 push가 가능하고 이 때만 Docker hub에 push됨
    - CI to Docker Hub는 성공하지만 CI to GHCR은 모두 실패함
    - Docker Hub에는 `simplewhale` 이라는 이름으로 repo가 생김

## 참조
- [Docker BuildKit](https://docs.docker.com/develop/develop-images/build_enhancements/)
- [git bash에서 anaconda 사용하기](https://reliablecho-programming.tistory.com/47)
- [Run you image as a container](https://docs.docker.com/language/python/run-containers/)
- [Use Volume & compose](https://docs.docker.com/language/python/develop/')
- [GitHub Docker 연결](https://docs.docker.com/language/python/configure-ci-cd/)