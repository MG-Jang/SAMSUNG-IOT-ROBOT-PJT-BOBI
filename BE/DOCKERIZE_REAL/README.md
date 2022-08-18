---
author: Dongwon Kim
date: 2022-08-05
---
# Dockerize

- local windows10에서 django + mysql + react + nginx를 docker 화
- 예제에서 mariadb로 진행되는 부분 mysql로 변경
- python, django, mysql의 버전은 노션 내 정리되어 있는 것과 동일하게 설정
- `docker-compose run --rm web sh -c "django-admin startproject config"` 로 입력(. 제외) 해야 만들어짐
    - . 포함하면 invalid project name이라고 나옴
    - 이렇게 하면 web 내 config 폴더 내에 manage.py와 config 폴더가 하나 더 생기는데 그냥 수동으로 web 내 config 폴더에 옮겨서 참고한 것과 동일한 dir tree를 만듦
- 나머지 부분은 따라하면 됨
- makemigrations를 할 때 `(2061, 'RSA Encryption not supported - caching_sha2_password plugin was built with GnuTLS support')` 등등의 에러가 발생하며 난리가 남
    - docker exec -it db bash로 직접 도커 내로 들어가서 mysql로 확인해보면 todoList는 만들어져 있지만 user는 만들어져 있지 않음
    - 무식하게 sql문을 이용하여 mysql_native_password를 사용하고 todoList에 권한이 모두 있는 user을 만들고 진행하면 잘 됨
- VSCode에서 자동으로 만들어주는 파일 중 import include를 django.urls가 아니라 다른 곳에서 해주는 게 있는데 이것 때문에 `str object has no attribute tag` 에러 발생 → 고치니까 잘 된다
- 비밀번호
    - django
        - root, password
    - mysql
        - root, password
        - user, password

## TODO

- [ ]  react와 연결하기
- [ ]  실제 프로젝트의 django, mysql 넣기
- [ ]  mosquitto 설치

## 참고

- [web 쪽 docker화](https://mdntrip.tistory.com/136?category=1003320)
- [Mosquitto docker화](https://www.homeautomationguy.io/docker-tips/configuring-the-mosquitto-mqtt-docker-container-for-use-with-home-assistant/)
