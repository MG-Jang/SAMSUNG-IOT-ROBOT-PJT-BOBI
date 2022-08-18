# xml 파일 생성 (장명근 정리)

- 참고 사이트: https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=hihimani&logNo=80154867344

> 설치 및 실행 방법
- 설치 
    - 참고 사이트를 참고
- 실행:
    - positive, negative 사진 모두 bmp 형식으로 생성
    - jpg 파일을 넣고 "jpg를 bmp로.bat" 파일을 실행(첨부 파일)
    - positive, negative 1:3 비율로 하는 것을 권장
    - 3.openv_haatraining.bat을 실행하는경우 오류가 발생 할수있다.
        - data의 cascade 폴더를 삭제후 다시실행
- testcase1:
    -  p, n의 갯수를 초기 5, 8개로 실행 
    -  xml 파일을 생성에 성공하였으나 인식에 문제가 있음
    - xml 생성시간: 10초 내외
- testcase2: 
    - p, n 갯수를 19 80개로 증가
    - 3.openv_haatraining.bat 실행시 14번에서 멈춘상태로 매우 시간이 오래 걸림(언제 끝날지 예측불가)