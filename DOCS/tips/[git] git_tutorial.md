# git 나만의 정리

- 구글 검색을 하면 이유에대해 자세히 나와있다. 여기에는 내가 직접 팀원들과 개발하면서 경험하고 느낌점을 토대로 작성하였다.

> ### git 사용 이유 

  1. 회사 차원에서 코드 개발을 혼자 모든것을 다하는 경우는 거의 없다. 따라서 협업은 필수적이며 이때 현재 가장 많이 사용되는 툴이 git이다. 
  2. git을 사용하면 서로간 코드공유가 편해지고 또한 코드를 분석하는 시간도 단축된다. 
  3. 버전을 따로 관리가 가능하다. 회사에서는 배포하는 버전과 개발하는 버전이 구별 되어있는 경우가 대부분이다. 이때 git을 사용한다면 버전별로 관리가 용의하다. ex)
   -  master (최상위 폴더)
      -  release (배포버전)
      -  develop (개발 중인 버전)
         -  HW 
         -  FE 
         -  BE  
   4. commit 내용을 팀원간 규칙을 정하여 수정되거나 새롭게 올라온 코드를 전부 읽어보지 않더라도 commit 제목만 읽고 어떤식으로 코드가 수정되고 jira의 몇번째 이슈를 다룬건지 한눈에 파악이 가능하다.

> ### git 사용법

<hr>

### 기본 세팅
- 참고: 여러가지 방법이 존재하겠지만 나는 git bash를 활용하였다.

1. 먼저 git bash를 설치한다.
  - 설치 참고 사이트: https://xangmin.tistory.com/102
2. 설치가 끝났다면 git을 사용할 주소를 이용하는 git 페이지 에서clone(가져)한다. 
  - ex)https://lab.ssafy.com/s07-webmobile3-sub2/S07P12A208.git
3. 이후 바탕화면에서 우클릭 -> git bash here를 실행
```
$ git clone [주소]
ex)  git clone https://lab.ssafy.com/s07-webmobile3-sub2/S07P12A208.git
// 참고: [] 안에 들어있는 내용은 그냥 적는 것을 뜻한다.
```
4. 이후 바탕화면에 폴더하나가 생성된것을 알 수 있다.
5. 폴더에 들어가면 기본적인 구성만 되어있을것이다. 또한 branch는 master로 설정 되어있다. 

<hr>

### branch 생성 (가지치기)
- git을 사용하는 경우 branch를 많이 나누어서 사용하게된다. 이유는 branch를 나누어 배포버전 개발버전 으로 나누고, HW FE BE등으로 분리를 하여 개발을 진행한다.
   1. 현재 존재하는 branch 확인
```
$ git branch -a
``` 
   2. git branch 생성
```
$ git switch -c [브랜치 이름]
```
 3. 만약 이미 branch가 존재한다면
```
$ git switch [브랜치 이름]
```
<hr>

### commit 방법 (코드 git에 올리기)

- `git add .` 사용 지양
    - git add 할 때 혹시 내가 삭제하면 안 되는 파일을 삭제했을 수도 있으니까 본인이 바꾼 파일만 git add ./바꾼 파일 하는 게 좋음(merge 시 충돌 방지)
        
        ```
        $ git add ./새로운 폴더/*                // 새로운 폴더 + 폴더 내 내용 들어감
        $ git add ./바꾼 파일(혹은 새로운 파일)  // 바꾼 파일 들어감
        ```
        
- 혹시 모르니 기본 개발은 git dir 이 아닌 다른 폴더에서 진행 후 다 된 사항을 git dir에 옮기는 것도 방법
- 다른 사람이 쓰고 있는 feature branch를 가능한 같이 사용하지 않기!
- 해당 feature가 다 개발되고 나면 merge&feature branch 삭제

## 상황 1

HW에서 OpenCV 데이터 학습을 시키는 개발을 하려고 한다

```
$ (master) git switch HW                        // master -> HW branch로 변경 
$ (HW) git pull origin HW                         // HW 원격 변경 사항 반영
$ (HW) git switch -c feature/OpenCV_data_training  // HW branch에서 개발할 branch 만듦
$ (feature/OpenCV_data_training) 개발 진행...    
$ (feature/OpenCV_data_training) git add ./[바꾼 파일 or 바꾼 폴더]
$ (feature/OpenCV_data_training) git commit
$ (feature/OpenCV_data_training) git switch HW   // 개발 branch -> HW branch로 변경
$ (HW) git merge feature/OpenCV_data_training      // HW branch에 개발 branch merge
$ (HW) git push origin HW                          // HW 변경 사항 원격에 push
$ (HW) git branch -d feature/OpenCV_data_trainging // 로컬 개발 branch 삭제
$ (HW) git push origin --delete feature/OpenCV_data_training // 원격 개발 branch 삭제
```

## 상황2

공통 기획 사항을 올리려고 한다.

```
$ (master) git pull origin master  // master 원격 변경 사항 반영
$ (master) git add ./새로운 파일   // 새로운 파일 올리기
$ (master) git commit
$ (master) git push origin master  // master branch에 해당 파일 올림
```