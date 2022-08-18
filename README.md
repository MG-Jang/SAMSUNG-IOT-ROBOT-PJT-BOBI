---
last modified: 2022-08-18
---

<p align='center'>
  <img src="./DOCS/etc/bobi_dot.png" alt="icon" width="400"> 
</p>


# BoBi 
`SSAFY 공통 프로젝트`  
`SSAFY 7기 2반 8팀`

> 보비 [명] 보조하여 돌봄  

## 👫 아이용 케어 로봇 친구

[![bobi](https://img.youtube.com/vi/Bp4MuVhe0w8/0.jpg)](https://youtu.be/Bp4MuVhe0w8)

## 👀 부모님에게는 실시간으로 아이를 볼 수 있는 기능  
- 👯 아이를 인식하여 따라다니는 기능  
- 🗂️ 아이의 특별한 순간을 아카이빙 하여 저장 가능  
- 🚨 실시간으로 위험 상황 확인 가능  
- 💌 아이와 음성 메시지 주고 받기 가능  

## 👫 아이에게는 함께 해주는 친구로서의 기능
- 🔉 친해지면 특별한 이야기를 들려주는 친구 기능
- 💌 부모님과 음성 메시지로 소통하는 기능

## 🤖 BoBi can do...
🖱️ 이미지를 클릭하면 영상을 볼 수 있어요!  

1. 음성 명령에 따른 제스처
- 앉아  
[![bobi sit](https://img.youtube.com/vi/QayOqNE-Qvk/0.jpg)](https://youtu.be/QayOqNE-Qvk)
- 일어나  
[![bobi stand up](https://img.youtube.com/vi/nqKIE4EKs0M/0.jpg)](https://youtu.be/nqKIE4EKs0M)  

- 그 외 `왼손`, `왼손`, `엎드려`, `잘했어`와 `춤추자`를 할 수 있어요!
2. 아이 팔로잉
- 팔로잉  
[![bobi following](https://img.youtube.com/vi/AR1pQhxaYFQ/0.jpg)](https://youtu.be/AR1pQhxaYFQ)  
- 보비 시점  
[![bobi view](https://img.youtube.com/vi/_ghxQe-UKGY/0.jpg)](https://youtu.be/_ghxQe-UKGY)  
3. 사족 보행  
[![bobi left right](https://img.youtube.com/vi/R6O0f2qAB7g/0.jpg)](https://youtu.be/R6O0f2qAB7g)
4. 이야기 들려주기
5. 음성 메시지 주고 받기  
[![bobi message](https://img.youtube.com/vi/tOKoOfi_7MY/0.jpg)](https://youtu.be/tOKoOfi_7MY)

6. 전용 웹페이지  
[![bobi web](https://img.youtube.com/vi/2NgXGsnAArI/0.jpg)](https://youtu.be/2NgXGsnAArI)

> for more info, visit our [**wiki!!**](https://lab.ssafy.com/s07-webmobile3-sub2/S07P12A208/-/wikis/home)

## Git Structure

(branch) /folder

- (master)
  - [/DOCS/ideas](./DOCS/ideas): 모두가 볼 기획 내용, total architecture, ERD 등
  - [/DOCS/tips](./DOCS/tips): 모두가 볼 팁
  - [/DOCS/etc](./DOCS/etc)
  
- (HW)
  - [/HW/DOCS/ideas](./HW/DOCS/ideas): HW가 볼 기획 내용
  - [/HW/DOCS/tips](./HW/DOCS/tips): HW 볼 팁 내용
  - [/HW](./HW): HW 소스 코드
  
- (FE)
  - [/FE/DOCS/ideas](./WEB/FE/DOCS/ideas): FE가 볼 기획 내용
  - [/FE/DOCS/tips](./WEB/FE/DOCS/tips): FE가 볼 팁 내용
  - [/FE](./WEB/FE): FE 소스 코드
  
- (BE)
  - [/BE/DOCS/ideas](./WEB/BE/DOCS/ideas): BE가 볼 기획 내용  
  - [/BE/DOCS/tips](./WEB/BE/DOCS/tips): BE가 볼 팁 내용  
  - [/BE](./WEB/BE): BE 소스 코드

    
## Total Architecture

- 기획  
![total_architecture_refined.drawio](/uploads/a5c85dfe389a1280565afa1ecd76e5ae/total_architecture_refined.drawio.png)

- 최종  
![total_architecture](/uploads/6aa48867839c48b3a5ac4dc84bdd26d8/total_architecture.png)

## Members
|이름 | 이메일 | 역할 |
|---|---|---|
|곽다원 | wings4608@gmail.com | 3D modeling, Robot movement |
|김동원 | kdw324400@gmail.com | Voice recognition, MQTT |
|신선영 | sunyeong0412@naver.com | BE, Deploy, Server, FE(Sensor, Story), Design|
|이승훈 | a01038517287@gmail.com | FE(Login, Archive, Voice, Remote Control)|
|장명근 | jang23mg@naver.com | Robot movement, Video detection |
|정재훈 | jaeung644@gmail.com | Voice recognition, Video detection, Sensors |
