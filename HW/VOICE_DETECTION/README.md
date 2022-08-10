---
author: Dongwon Kim
date: 2022-08-04
---
# RPI에서 porcupine & STT 연결
- feature/voice_recognition 에서 진행
- RPI에서 음성 인식 완성

## RPI 세팅

- google stt 진행하던 대로 /home/pi/google_stt 내 설정된 env activate(`source env/bin/activate`)
- `pvporcupine, pvporcupinedemo` 가상 환경 내 설치
- 통합은 /home/pi/voice_recognition에서 진행
    
    ```
    /home/pi/voice_recognition
    	|-- voice_recognition.py
    	|-- porcupine_custom.py
    	|-- connect_porcupine_record.py
    	|-- camera_map_test.py
    ```
    
- 마이크 1개 사용 시
    
    porcupine을 실행 후 stt를 실행하려고 할 때 stt에서 device busy 가 발생
    
    → 마이크 2개 설치(usb 2.0 포트에 하나씩)
    
    `porcupine_demo_mic --show_audio_devices` 통해 연결되어 있는 포트 확인( RPI 부팅될 때마다 바뀜)
    
- 마이크 2개 사용 시 잘 camera_map_test 까지 잘 연동됨
- stt delay 거의 없었음
- `python3 connect_porcupine_record.py --access_key [picovoice access key] --keyword_paths /home/pi/porcupine/hi_bobi_ko_rpi.ppn --model_path /home/pi/porcupine/porcupine_params_ko.pv --audio_device_index [device index]`

## 파일 설명

- voice_recognition.py
    - parse_command
        
        stt에 `/home/pi/voice_recognition/파일이름` 을 보내서 text 돌려 받음, 명령어만 파싱
        
    - map_movement
        
        self.var에 담긴 값에 따라 camera_map_test.commandAct 함수 실행
        
    - run
        
        arecord device 1, 0을 이용하여 4초 동안 녹음 진행
        
        parse_command, map_movement 호출
        
- porcupine_custom.py
    - PorcupineCustom
        
        arg로 받은 값대로 porcupine 설정하고 run 함수에서 실행, 만약 hotword 감지되면 전역 변수 hot_word_flag를 1로 설정, 감지 되지 않으면 0으로 설정
        
    - porcupine_parsing
        
        arg 받기 & args로 묶어서 return
        
- connect_porcupine_record.py
    - DetectHotword
        
        hot_word_flag가 1로 설정되면 stt를 실행하는 함수, stt 실행하고 5초 sleep(4초 동안 녹음 + stt 값 받는 시간을 생각해서 설정)
        
    - has_live_threads
        
        살아 있는 thread가 있는지 확인하는 함수
        
    - main
        
        porpupine_parsing을 이용하여 arg 받기
        
        PorcupineCustum에 받은 arg 넣고 thread로 설정
        
        DetectHotword도 thread로 설정
        
        두 thread를 threads array에 넣어 통합적 관리
        
        ctrl+c를 누르면 꺼지도록 설정
        
        (windows에서는 KeyboardInterrupt 시 join을 안 해도 에러 없이 깔끔하게 종료되지만 RPI에서는 해야 에러와 함께 종료됨)
        
- camera_map_test.py
    - camera_opencv를 대신하는 모듈
    - 각각의 명령어에 따라 프린트를 진행하는 commandAct 함수가 있음

## 결과

- RPI의 google_stt를 위해 만든 가상 환경에서 connect_porcupine_record.py가 잘 동작함
- `하이 보비` 로 인식이 된 후 약간 쉬고 명령어를 말해야 잘 녹음됨
- 녹음 파일 이름은 test.wav
    - hotword detect 될 때마다 파일이 갱신됨
- stt delay 거의 없었음
- SSAFY 내 네트워크로는 stt StatusCode.UNAUTHENTICATED 에러가 발생함
→ 핸드폰 핫스팟을 키고 한 번 껐다 키니 바로 잘 됨
- 마이크는 2개 사용
- porcupine을 사용할 때 device_index를 0 제외 다른 것으로 설정(0은 stt에서 녹음할 때 씀)
- voice_recognition에서 '메시지' 라는 명령시 다음 5초 동안 녹음한 내용을 s3에 저장하는 것까지 확인(RPI에서 진행됨, 해당 dir는 voice_mssg)
- S3에 영상 데이터를 업로드 하고 MQTT 메시지 보내기
    - EC2에서 `$ mosquitto_sub -h i7a208.p.ssafy.io -t "testuser/voice/toweb"` 구독
    - windows에서 `python ./s3_voice_mssg.py` 실행했을 때 단위 테스트 성공
        - 파일이 S3에 잘 올라감
        - server에서 구독하고 있는 창에 메시지가 잘 표시됨
- requirements.txt 제작 완료
    - GLIB 에러는 해결해야 함(다른 가상환경에서 테스트 했을 때 에러 발생)

## 할 일
- [ ] : 마이크 2개로 s3에 잘 들어가는지 확인
- [X] : s3에 들어간 후 be로 mqtt 메시지 보내주기
- [ ] : RPI에서 S3, MQTT 테스트



## 보완할 것

- 현재 2개의 mic를 사용하는데 1개를 사용할 수 있으면 더 좋을 듯
    - pvrecorder를 활용하거나 thread 자체를 잠시 자게 하는 건 어떨까??