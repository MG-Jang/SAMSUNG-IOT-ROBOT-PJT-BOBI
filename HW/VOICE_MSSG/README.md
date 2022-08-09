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


## 참고

- [boto3 가이드](https://boto3.amazonaws.com/v1/documentation/api/latest/guide/quickstart.html)
- [access 키 만들고 적용하기](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#Using_CreateAccessKey)