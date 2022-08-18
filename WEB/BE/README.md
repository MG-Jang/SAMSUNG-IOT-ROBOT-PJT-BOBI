# 🤖 BoBi - Backend

> 관찰형 반려 케어 로봇 BoBi  ::  *보비[명] 보조하여 돌봄*



```
📁 BE
├─bobi_backend
├─DOCKERIZE			//Docker 시도 1
├─DOCKERIZE_REAL	// Docker 시도 2
├─DOCS
└─README.md
```



## 🛠 기술 스택 (핵심 기능)

\-  Django **Django 3.2.12**

\-  교차 출처 리소스 공유 **django-cors-headers 3.13.0**

\-  더미데이터 생성 **django-seed 0.3.1**

\-  API **djangorestframework 3.13.1**

\-  MySQL DB 연동 **mysqlclient 2.1.1**



## 📊 Model (DB) 구조

```
💾 accounts_user (사용자)
	- [P] id (int)
	- [F] robot_id (int)
	- [F] level (int)
	- password (varchar(128))
	- last_login (datetime(6))
	- is_superuser (boolean)
	- username (varchar(150))
	- first_name (varchar(150))
	- last_name (varchar(150))
	- email (varchar(254))
	- is_staff (boolean)
	- is_active (boolean)
	- date_joined (dataetime(6))
	- youtube_id (varchar(30))
	- phone_number (int)

💾 bobi_robot
	- [P] id (int)
	- [F] level (int)	// 친밀도
	- exp (int)
	
💾 bobi_level
	- [P] level (int)
	- required_exp (int)	// 다음 레벨까지 필요한 친밀도
	
💾 bobi_sensor
	- [P] sensor_id (int)
	- [F] robot_id (int)
	- [F] level (int)
	- gas (double)			// 1: 정상 상태, 0: 위험 감지 상태
	- temperature (double)
	- humidity (double)
	- datetime (varchar(30))
	- battery (double)
	
💾 stories_story
	- [P] id (int)
	- narr_link (varchar(100))		// 음성 내레이션 삽입 시 
	- title (varchar(30))
	- content (longtext)
	
💾 archives_archivevideo
	- [P] id (int)
	- video_url (varchar(500))		// 삽입할 유튜브 영상 URL
	- datetime (datetime(6))
	- title (varchar(20))
	- contents (longtext)

💾 voices_voicecheck
	- [P] id (int)
	- datetime (varchar(30))
	- is_checked (boolean)
```



##### 초기 ERD

![image-20220818172745645](C:\Users\SSAFY\Desktop\S07P12A208\WEB\BE\README.assets\image-20220818172745645.png)



##### 수정 ERD

![image-20220818151705240](C:\Users\SSAFY\AppData\Roaming\Typora\typora-user-images\image-20220818151705240.png)





## 🔍 URL settings

```
# 웹페이지
https://i7a208.p.ssafy.io/     // 메인 페이지
https://i7a208.p.ssafy.io/intro      // 설정 소개 페이지
https://i7a208.p.ssafy.io/live    // 실시간 유튜브 라이브 영상 재생
https://i7a208.p.ssafy.io/friendliness     // 현재 친밀도 확인
https://i7a208.p.ssafy.io/archive-video    // 영상 아카이브
https://i7a208.p.ssafy.io/story     // 스토리 텍스트 확인
https://i7a208.p.ssafy.io/control     // 로봇 조작 (배포 서버에서는 작동 X)
https://i7a208.p.ssafy.io/sensor     // 센서 데이터 확인
https://i7a208.p.ssafy.io/voice     // 음성 메시지 송수신
https://i7a208.p.ssafy.io/login // 로그인_미로그인시에만 접근 가능
https://i7a208.p.ssafy.io/user-detail  // 사용자 상세 정보 입력, 정보를 입력하지 않았을 시에만 접근 가능
https://i7a208.p.ssafy.io/user    // 회원정보 확인
https://i7a208.p.ssafy.io/config    // 환경설정

# api (DB 확인)
https://i7a208.p.ssafy.io/api/v1/sensors/    // 센서 데이터
https://i7a208.p.ssafy.io/api/v1/robots/    // 경험치
https://i7a208.p.ssafy.io/api/v1/stories/     // 스토리
https://i7a208.p.ssafy.io/api/v1/voicecheck/    // 음성 수신 알림
https://i7a208.p.ssafy.io/api/v1/archivevideos/    // 영상 아카이브
https://i7a208.p.ssafy.io/api/v1/fakeusers/     // 사용자
```



## 🌳 File structure

```
📂 BoBi
├─.config	// 서버 배포용 설정 파일
│  ├─nginx
│  └─uwsgi
├─accounts		// user 정보
├─archives			// 영상 아카이브
├─bobi			// 센서, 친밀도 등 로봇 저장 데이터
├─bobi_backend		// url, DB 세팅 등
├─bobi_frontend		// FE 빌드 파일	
├─movements
├─stories
├─voices
└─my_settings.py		// DB 설정 등 (개인정보 포함)
```



### How to update

- EC2 (mobaxterm 이용)

  ```bash
  $ cd /srv/bobi_backup
  ```

  

- git pull

  ```bash
  $ source myvenv/bin/activate
  ```

  ```bash
  (myvenv) ubuntu@ip-172-31-46-44:~$ cd /srv/bobi_backup
  ```

  ```bash
  (myvenv) ubuntu@ip-172-31-46-44:/srv/templix-backup$ git pull origin master
  ```



- static files 모으기

  ```bash
  python3 manage.py collectstatic
  ```

  

- [수정 없을 시 생략 가능] nginx 재등록

  ```bash
  sudo cp -f /srv/bobi_backup/.config/nginx/bobi_backend.conf /etc/nginx/sites-available/bobi_backend.conf
  ```

  ```bash
  sudo ln -sf /etc/nginx/sites-available/bobi_backend.conf /etc/nginx/sites-enabled/bobi_backend.conf
  ```

  

- restart

  ```bash
  sudo systemctl daemon-reload
  ```

  ```bash
  sudo systemctl restart uwsgi
  ```

  ```bash
  sudo systemctl restart nginx
  ```

  
