'''
# Class for voice recognition using google stt
# 
# Modification history
#   Created by Dongwon Kim on 04 Aug, 2022 
#
# reference
#   stt.py by 정재훈
'''
import os
import io
from google.cloud import speech
import camera_map_test
import porcupine_custom
from s3_voice_mssg import VoiceMessage


class VoiceRecognition():
    def __init__(self, voice_file_name='cmd.wav'):
        super(VoiceRecognition, self).__init__()
        self.local_file_path = os.path.join(
            '/home/pi/voice_recognition', voice_file_name)
        self.client = speech.SpeechClient()
        self.config = config = speech.RecognitionConfig(
            encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
            sample_rate_hertz=48000,
            language_code="ko-KR"
        )

    def parse_command(self):
        with io.open(self.local_file_path, 'rb') as f:
            content = f.read()
        audio = speech.RecognitionAudio(content=content)

        # 한번에 음성 데이터를 보내고 변환된 모든 텍스트 데이터를 한번에 받는 함수로 오디오 파일의 구성을 파라미터로 보낸다.
        response = self.client.recognize(config=self.config, audio=audio)

        # response는 여러개의 대안으로 전송되어 오는데, 그 중 confidence가 가장 높은 것을 체택한다.
        for result in response.results:
            var2 = result.alternatives[0].transcript

            # 만약 앉아, 일어서 등 다양한 명령어들이 들어왔을 경우, 맨 앞 명령어인 "앉아"만 수행되게 설계함
        var1 = var2.split()
        self.var = var1[0]

    def map_commands(self):
        # 필요한 기능들 추가 혹은 빼야할 듯
        if self.var == "전진":
            camera_map_test.commandAct('forward', None)
        elif self.var == "후진":
            camera_map_test.commandAct('backward', None)
        elif self.var == "좌회전":
            camera_map_test.commandAct('left', None)
        elif self.var == "우회전":
            camera_map_test.commandAct('right', None)
        elif self.var == "정지":
            camera_map_test.commandAct('DS', None)
        elif self.var == "가운데":
            camera_map_test.commandAct('TS', None)
        elif self.var == "위":
            camera_map_test.commandAct('up', None)
        elif self.var == "아래":
            camera_map_test.commandAct('down', None)
        elif self.var == "중간":
            camera_map_test.commandAct('UDstop', None)
        elif self.var == "왼쪽":
            camera_map_test.commandAct('lookleft', None)
        elif self.var == "오른쪽":
            camera_map_test.commandAct('lookright', None)
        elif self.var == "여기":
            camera_map_test.commandAct('LRstop', None)
        elif self.var == "점프":
            camera_map_test.commandAct('jump', None)
        elif self.var == "손":
            camera_map_test.commandAct('handshake', None)
        elif self.var == "메시지":
            self.record_voice()
        else:
            print("Unknown command!!")

    def record_voice(self):
        mssg_file_path = os.path.join(
            '/home/pi/voice_recognition', "from_bobi.wav")
        cmd = "arecord --device=hw:1,0 --format S16_LE -d7 --rate 48000 -V mono -c1 " + \
            mssg_file_path
        os.system(cmd)
        voice_mssg = VoiceMessage()
        voice_mssg.upload_file(mssg_file_path, 'testuser')

    def run(self):
        if porcupine_custom.hot_word_flag:
            cmd = "arecord --device=hw:1,0 --format S16_LE -d3 --rate 48000 -V mono -c1 " + \
                self.local_file_path
            os.system(cmd)
            print("\nFinish recording\n Start parsing")
            self.parse_command()
            print("\nFinish parsing\n command: " + self.var)
            print("command mapping...")
            self.map_commands()
