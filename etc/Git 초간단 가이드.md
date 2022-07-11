# 처음 git을 쓸 때

1. Git 다운로드받기 (선영이가 올려준 pdf파일따라서 진행하면 됨)

2. Git Bash 창에서 이메일 등록하기

   ```
   $git config --global user.email "깃랩 이메일"
   ```

3. 바탕화면이든 어디든 아무데나 우클릭하고 Git Bash 실행해서 깃랩에서 클론따오기

   ```
   $git clone https://lab.ssafy.com/s07-webmobile3-sub1/S07P11A208.git
   ```

4. 그러면 `S07P11A208` 폴더가 만들어짐

# 이후 개발 (무한반복)

1. 브랜치 만들기 (브랜치를 create해서 현재 브랜치에서 만들어진 브랜치로 이동하는 것까지 포함된 명령어)

``` 
$git switch -c 브랜치이름 (따옴표 쓸 필요 없음)
```

2. 개발이 끝나면 git add 하기(add 띄우고 .)

``` 
$git add .
```

3. 커밋하기

``` 
$git commit -m '커밋메시지'
```

4. 푸시하기

```
$ git push origin 브랜치이름
```

5. 뜨는 링크 들어가서 머지 리퀘스트 만들기

```
```

6. 상대가 머지리퀘스트하면

```
$git switch master
$git pull origin master
$git branch -d 브랜치이름
```







![image-20220711193135892](Git 초간단 가이드.assets/image-20220711193135892.png)