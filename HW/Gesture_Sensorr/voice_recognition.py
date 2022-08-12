'''
# Class for voice recognition using google stt
# 
# Modification history
#   Created by Dongwon Kim on 04 Aug, 2022 
#   Modified by Dongwon Kim on 11 Aug, 2022
#
# reference
#   stt.py by 정재훈
'''
import os
import io
from google.cloud import speech
import voice_porcupine_custom
from voice_s3_mssg import VoiceMessage
import robot
import go_oled
import oled_touch

from time import sleep


class VoiceRecognition():
    """Get voice cmd file -> google stt -> parse the result -> map functions
    :param user_id: user id from DB (primary key) as str(integer).
    :param voice_file_name: file name for cmd voice file.
    """
    def __init__(self, user_id, voice_file_name='cmd.wav'):
        super(VoiceRecognition, self).__init__()
        self.local_file_path = os.path.join(
            '/home/pi/WAVEGO/RPi', voice_file_name)
        self.client = speech.SpeechClient()
        self.config = config = speech.RecognitionConfig(
            encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
            sample_rate_hertz=48000,
            language_code="ko-KR"
        )
        self.user_id = user_id

    def parse_command(self):
        with io.open(self.local_file_path, 'rb') as f:
            content = f.read()
        audio = speech.RecognitionAudio(content=content)

        # send cmd.wav file to google stt and get result
        response = self.client.recognize(config=self.config, audio=audio)

        # among candidates, find a keyword that has the highest confidence
        for result in response.results:
            var2 = result.alternatives[0].transcript

        # only select the first word among cmd
        var1 = var2.split()
        self.var = var1[0]

    def map_commands(self):
        # map robot func according to the cmd
        if self.var == "앉아":
            go_oled.state = "sit"
            oled_touch.closeness += 10
            robot.sit()
        elif self.var == "일어나":
            go_oled.state = "always"
            robot.standUp()
        elif self.var == "오른손":
            oled_touch.closeness += 10
            robot.rightHand()
        elif self.var == "왼손":
            oled_touch.closeness += 10
            robot.leftHand()
        elif self.var == "엎드려":
            oled_touch.closeness += 10
            go_oled.state = "down"
            robot.lower()
        elif self.var == "잘했어":
            go_oled.state = "always"
            robot.upper()
        elif self.var == "메시지":
            oled_touch.closeness += 10
            go_oled.state = "msg"
            self.record_voice()
            go_oled.state = "always"
        else:
            print("Unknown command!!")

    def record_voice(self):
        """record voice message for 7 seconds -> send the file to S3 & publish MQTT mssg
        """
        file_name = self.user_id + "_from_bobi.wav"
        mssg_file_path = os.path.join(
            '/home/pi/WAVEGO/RPi', file_name)
        cmd = "arecord --device=hw:1,0 --format S16_LE -d7 --rate 48000 -V mono -c1 " + \
            mssg_file_path
        os.system(cmd)
        voice_mssg = VoiceMessage()
        voice_mssg.upload_file(mssg_file_path, self.user_id)

    def run(self):
        """record cmd if hot word detected -> parse -> map
        """
        if voice_porcupine_custom.hot_word_flag:
            robot.buzzerCtrl(1, 0)
            sleep(0.3)
            robot.buzzerCtrl(0, 0)
            go_oled.state = "record"
            cmd = "arecord --device=hw:1,0 --format S16_LE -d3 --rate 48000 -V mono -c1 " + \
                self.local_file_path
            os.system(cmd)
            go_oled.state = "always"
            print("\nFinish recording\n Start parsing")
            self.parse_command()
            print("\nFinish parsing\n command: " + self.var)
            print("command mapping...")
            self.map_commands()
            print("exp : " + oled_touch.closeness)
