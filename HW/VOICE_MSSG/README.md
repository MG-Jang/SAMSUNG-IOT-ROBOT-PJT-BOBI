---
author: Dongwon Kim
date: 2022-08-09
---

# S3 example

## AWS 계정 만들기
    - carerobotbobi@gmail.com
    - name: bobi
    - pw: bobiA208#
## boto3 설치
    - env picovoice로 진행
    - 역할 만들기, access 키 만들기
    - aws cli 설치 → access 키 등록
    - boto3 설치

## AWS 인증
```
$ aws configure
aws_access_key_id = "csv 파일의 access key"
aws_secret_access_key = "csv 파일의 secret key"
```
- 나머지 region 등은 그냥 defualt로 설정하기 위해 enter 누름

## S3 boto3 example
- `s3_example.py` 에서 boto3 이용 S3에 파일 넣고 다운로드 windows10에서 test 완료
- 실행 시 python3로는 진행이 안 됨 python으로 진행해야 함

## RPI에서 진행
- google_stt 폴더 내에 존재하는 가상 환경에서 진행(source env/bin/activate)
- 패키지 설치
    ```
    pip install boto3
    pip install awscli
    ```
- access key 등록
    - windows에서 테스트할 때 만들었던 그 access key 이용
    - cli 이용 등록
        ```
        $ aws configure
        ... windows와 동일
        ```
- RPI에서도 `s3_example.py` 동작 확인 완료
    - 동일한 이름의 파일을 올리면 덮어쓰기 함

## 다른 voice service와의 통합
- `s3_voice_mssg.py` 에 VoiceMessge()라는 class를 만듦
    - bucket 이름 고정
    - upload file, download file을 파일 이름만 넣으면 되도록 함
- python(python3 X)을 이용하여 실행한 결과 upload, download 모두 windows에서 잘 진행됨
- RPI에서도 잘 동작함
- 마이크가 1개 뿐이라서 wake up word와 연동을 하진 못함
- voice_recognition.py를 일부 수정하여 여기서 '메시지'라는 명령어가 들어왔을 때 음성을 녹음하여 s3에 올리도록 함
- RPI에서 동작 테스트 완료
    - `voice_recognition_copy.py`를 이용하여 테스트 진행
    - `python ./voice_recognition_copy.py` 로 실행하여 테스트
    - `메시지` 라는 명령 후 잠시 쉬고 `메시지 보내줘` 라는 내용의 음성 메시지를 녹음하여 s3에 올라간 것까지 확인 완료
## 참고

- [boto3 가이드](https://boto3.amazonaws.com/v1/documentation/api/latest/guide/quickstart.html)
- [access 키 만들고 적용하기](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#Using_CreateAccessKey)