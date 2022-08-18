#!/usr/bin/env python3
# -*- coding: utf-8 -*- 
#----------------------------------------------------------------------------
# Created By  : Dongwon Kim
# Created Date: July 25, 2022
# version ='1.0'
# ---------------------------------------------------------------------------
""" Google Cloud Speech API sample test in Korean

Test to be Done:
    a208_korean_hello.wav(안녕하세요 보비 팀입니다 앉아 뒤로 앞으로)
    ssafy_iot_bobi.wav(SSAFY IoT 프로젝트 보비)
    
Run in 'D:\2022\010 공통프로젝트'\python-speech\samples' dir
    file path is set with this path
"""

import io
import os

DIR_PATH= os.getcwd()

def a208_korean_test():
    # Imports the Google Cloud client library
    # [START speech_python_migration_imports]
    from google.cloud import speech

    # [END speech_python_migration_imports]

    # Instantiates a client
    # [START speech_python_migration_client]
    client = speech.SpeechClient()
    # [END speech_python_migration_client]

    # The path of the audio file to transcribe    
    speech_file = os.path.join(DIR_PATH, 'snippets', 'resources', 'ssafy_iot_bobi.wav')
    
    with io.open(speech_file, "rb") as audio_file:
        content = audio_file.read()
    
    audio = speech.RecognitionAudio(content=content)

    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=16000,
        language_code="ko-KR",
        audio_channel_count=1,
        model="latest_short",
    )

    # Detects speech in the audio file
    response = client.recognize(config=config, audio=audio)

    for result in response.results:
        print("Transcript: {}".format(result.alternatives[0].transcript))
        print(result)
    # [END speech_quickstart]


if __name__ == "__main__":
    a208_korean_test()
