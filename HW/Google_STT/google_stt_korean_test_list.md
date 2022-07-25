---
date: 2022-07-25
author: Dongwon Kim
---
# Google STT API test list in Korean
- tested with `A208_korean_test.py`
## Adult
```
config = speech.RecognitionConfig(
    encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
    sample_rate_hertz=16000,
    language_code="ko-KR",
    audio_channel_count=1,
    model="latest_short",
)
```
- 노트북 음성 녹음으로 m4a 파일로 녹음 후 [변환기](https://convertio.co/kr/)로 wav 파일로 변환  

- a208_korean_hello.wav
    - 답: 안녕하세요 보비 팀입니다 앉아 뒤로 앞으로
    - 결과: 안녕하세요 보비 팀입니다 앉아 뒤로 앞으로
- ssafy_iot_bobi.wav
    - 답: SSAFY IoT 프로젝트 보비
    - 결과: SSAFY IoT 프로젝트 보비
## Child
```
config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        language_code="ko-KR",
        audio_channel_count=2,
        model="latest_short",
    )
```
- youtube에서 아이 음성을 mp3로 딴 후 wav로 변환  

- 7_years_old.wav
    - 답: 동생아 가져왔어 여기 안에 가방에 있거든
    - 결과: 동생아 가져왔어 여기 안에 가방에 있거든
- 5_years_old.wav
    - 답: 에이 못 그리겠어
    - 결과: 모르겠다
- 3_years_old.wav
    - 답: 올라프 엄마 아빠
    - 결과: 올라프 엄마 아빠
- 3_years_old_sentence.wav
    - 답: 엄마가 자꾸 게임만 하잖아
    - 결과: 엄마가 자꾸 게임만 하잖아