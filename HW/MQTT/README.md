---
author: Dongwon Kim
date: 2022-08-11
---
# MQTT
## 세팅
1. RPI에서 ~/google_stt 내 env 가상 환경 실행(`source env/bin/activate`)
2. `python ./mqtt_sub_in_rpi_add_robot_code.py --user_id 1`로 파일 실행
    - 파일이 있는 곳에서
    - `s3_voice_mssg.py` 필요
3. `[user_id]/voice/torobot`에 메시지 들어올 때마다 S3에서 `[user_id]_from_web.wav` 다운 받음

## 테스트
- [X] RPI에서 [user_id]/voice/torobot에 MQTT 받았을 때 [user_id]_from_web.wav 다운 받기
- [X] MQTT 동작 받을 때 robot_test.py랑 연결
- [ ] MQTT 동작 받을 때 robot.py랑 연결
- [ ] Web이랑 MQTT 동작 연결