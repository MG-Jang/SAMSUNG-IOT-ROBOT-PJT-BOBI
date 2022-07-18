## Jira 옮기기

1. Jira Issues 탭에서 `View all issues and filters`클릭
2. Tools -> `all issues` 클릭
3. 옮길 이슈 선택 후 `Next`
4. Move Issues 선택 후 Next
5. 옮길 프로젝트와 이슈 타입 선택하기
6. 확인 후 Confirm 하기


## Git 옮기기

Developer가 아닌 Maintainor에서 실행시켜보자!

1. git clone --mirror [원본 저장소 경로]
2. cd [원본 저장소 이름].git
3. git remote set-url --push origin [이동할 저장소 경로]
4. git push --mirror

