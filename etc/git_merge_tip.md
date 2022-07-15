## git merge

예시

- 작업 branch: test
- merge 할 branch: develop

### 방법

- test branch에서 바뀐 부분을 push 한다
- merge 할 branch인 develop branch로 switch 한다
- git merge test로 test branch를 develop branch에 merge한다
- develop branch를 push 한다

### test1

- 상황
    - test branch에서 develop에 있던 a.txt 삭제
    - git add .로 모든 파일을 tracking 함
- 결론
    - develop에 있는 a.txt도 삭제됨

### test2

- 상황
    - test branch에서 develop에 있던 a.txt 삭제, b.txt 생성
    - git add ./b.txt로 b.txt 만 트래킹
- 결론
    - a.txt는 삭제되지 않고 b.txt만 추가됨
    - test branch도 문제 없이 삭제됨

### 결론

- git add . 대신 git add [내가 수정한 파일]을 사용하자!
- 혹시 모르니 프로젝트 폴더랑 git 폴더랑 따로 두고 프로젝트 폴더에서 개발 한 거, 달라진 코드를 git 폴더에 복붙하는 형태로 사용하자