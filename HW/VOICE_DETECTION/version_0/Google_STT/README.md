---
last modified: 2022-07-26
---
# Install Google STT library in RaspberryPi

## 환경

- 라즈베리파이4B Debian Buster 버전(2022.07.26 기준 RPI imager의 legacy 버전)

## 사전 준비

1. [Google Speech to Text console start guide](https://cloud.google.com/speech-to-text/docs/transcribe-console?hl=ko)를 따라 프로젝트 설정 진행.
    - 프로젝트 생성
    - `사용자 인증 정보` 페이지 상단 `+ 사용자 인증 정보 만들기-> 서비스 계정-> 계정 이름 설정`
    - 만든 서비스 계정 클릭 페이지 상단 메뉴 바의 `키-> json`  키 만들기 하여 json 키 다운 받기
    - 라즈베리파이에 해당 키 파일 저장
2. [python 환경 세팅](https://cloud.google.com/python/docs/setup)
    
    ```
    sudo apt update
    sudo apt install python3 python3-dev python3-venv
    sudo apt-get install wget
    wget https://bootstrap.pypa.io/get-pip.py
    sudo python3 get-pip.py
    pip3 --version
    
    cd your-project
    python3 -m venv env
    source env/bin/activate
    ```
    

## google cloud speech 설치

1. client library 설치

```
pip install --upgrade google-cloud-speech
```

1. `export GOOGLE_APPLICATION_CREDENTIALS="KEY_PATH"` 를 이용하여 이전에 RPI에 넣어놓은 key 파일 등록
    - 이 때 상대 경로로 하면 찾을 수 없다는 에러가 발생하므로 **절대 경로**를 사용할 것
2. [quickstart.py](http://quickstart.py) 실행
    
    ```python
    # Imports the Google Cloud client library
    from google.cloud import speech
    
    # Instantiates a client
    client = speech.SpeechClient()
    
    # The name of the audio file to transcribe
    gcs_uri = "gs://cloud-samples-data/speech/brooklyn_bridge.raw"
    
    audio = speech.RecognitionAudio(uri=gcs_uri)
    
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=16000,
        language_code="en-US",
    )
    
    # Detects speech in the audio file
    response = client.recognize(config=config, audio=audio)
    
    for result in response.results:
        print("Transcript: {}".format(result.alternatives[0].transcript))
    ```
    
    - `ImportError: /lib/arm-linux-gnueabihf/libm.so.6: version GLIBC_2.29 not found (required by /home/pi/google_stt/env/lib/python3.7/site-packages/grpc/_cython/cygrpc.cpython-37m-arm-linux-gnueabihf.so)` 발생
        - 찾아보니 Google PubSub가 Debian GLIBC 2.29를 지원하지 않는 것으로 보임
        - 해결 방안으로는
            - 라즈베리파이의 OS를 Ubuntu로 변경한다.
            - PATH를 설정한 후 grpcio를 다시 설치한다.
            
            프로젝트 특성 상 라즈베리파이의 OS를 변경하는 것은 불가능 했으므로 두 번째 방법을 사용하였다.
            
            1. 텍스트 에디터로 /home/pi/.bashrc 에 아래 줄 추가
                
                `export PATH="$HOME/.local/bin:$PATH"`
                
            2. 아래 명령어 실행
                
                ```
                pip uninstall grpcio
                pip uninstall grpcio-status
                pip install grpcio==1.44.0 --no-binary=grpcio
                pip install grpcio-tools==1.44.0 --no-binary=grpcio-tools
                ```
                
                3, 4번째 명령어 합쳐 실행하는데 1시간 정도 걸린다.
                

## 결과

```
$ (env) python ./google_stt/quickstart.py
Transcript: how old is the Brooklyn Bridge
```

## 참고

- [사용자 인증 정보 등록](https://cloud.google.com/speech-to-text/docs/before-you-begin)
- [GLIBC 2.29 error 해결](https://groups.google.com/g/grpc-io/c/T91EyO81c8I/m/F4YJRpqSAwAJ)