# MySQL과 연동 위한 파일
# 커넥터: mysqlclient 설치 완료

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql', #1 사용할 엔진 (수정X)
        'NAME': 'bobi', #2  연동할 MySQL의 DB 이름
        'USER': 'pjt_bobi', #3  DB 접속 계정명                  
        'PASSWORD': 'mysql989312bobi#',  #4 DB 접속 계정 비밀번호             
        'HOST': 'i7a208.p.ssafy.io',   #5  실제 DB 주소 (따로 설정 안했으면 수정 X)              
        'PORT': '3306', #6  포트번호 (따로 설정 안했으면 수정 X)
    }
}
SECRET_KEY ='django-insecure-p^xm%mnc+betjp4@)lmx!35rbl^02kygw(@$u5(_bp3b$z_9a_'