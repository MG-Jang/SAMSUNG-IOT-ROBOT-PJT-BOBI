## Git 옮기기

Developer가 아닌 Maintainor에서 실행시켜보자!

1. git clone --mirror [원본 저장소 경로]
2. cd [원본 저장소 이름].git
3. git remote set-url --push origin [이동할 저장소 경로]
4. git push --mirror