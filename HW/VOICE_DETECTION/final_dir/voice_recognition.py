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
import time
from google.cloud import speech
import voice_porcupine_custom
from voice_s3_mssg import VoiceMessage
import robot
import sensor_oled
import sensor_mysql
from voice_speaker import Speaker

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
        self.speaker = Speaker()

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
            if sensor_mysql.closeness < 100 :
                print("exp 100 미만")
                sensor_oled.state = "what"   
            else :
                sensor_oled.state = "sit"
                sensor_mysql.closeness += 10
                robot.sit()
        elif self.var == "일어나":
            if sensor_mysql.closeness < 100 :
                print("exp 100 미만")
                sensor_oled.state = "what"   
            else :
                sensor_oled.state = "always"
                robot.standUp()
        elif self.var == "오른손":
            if sensor_mysql.closeness < 100 :
                print("exp 300 미만")
                sensor_oled.state = "what"   
            else :
                sensor_mysql.closeness += 10
                robot.rightHand()
        elif self.var == "왼손":
            if sensor_mysql.closeness < 100 :
                print("exp 300 미만")
                sensor_oled.state = "what"   
            else :
                sensor_mysql.closeness += 10
                robot.leftHand()
        elif self.var == "엎드려":
            if sensor_mysql.closeness < 200 :
                print("exp 200 미만")
                sensor_oled.state = "what"   
            else :
                sensor_oled.state = "down"
                sensor_mysql.closeness += 10
                robot.lower()
        elif self.var == "잘했어":
            if sensor_mysql.closeness < 200 :
                print("exp 200 미만")
                sensor_oled.state = "what"   
            else :
                sensor_oled.state = "always"
                robot.upper()
        elif self.var == "메시지":
            sensor_mysql.closeness += 10
            sensor_oled.state = "msg"
            self.record_voice()
            # time.sleep(1) # OLED에 송신 O/X 표시
            sensor_oled.state = "always"
        elif self.var == "이야기":
            self.speaker.speak_story()
            print("가장 최신 이야기 들려주기")
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
        if(voice_mssg.upload_file(mssg_file_path, self.user_id)):
            sensor_oled.state = "success"
            robot.ok()
        else :
            sensor_oled.state = "fail"

    def run(self):
        """record cmd if hot word detected -> parse -> map
        """
        if voice_porcupine_custom.hot_word_flag:
            robot.buzzerCtrl(1, 0)
            time.sleep(0.2)
            robot.buzzerCtrl(0, 0)
            time.sleep(0.2)
            robot.buzzerCtrl(1, 0)
            time.sleep(0.2)
            robot.buzzerCtrl(0, 0)
            sensor_oled.state = "record"
            cmd = "arecord --device=hw:1,0 --format S16_LE -d3 --rate 48000 -V mono -c1 " + \
                self.local_file_path
            os.system(cmd)
            sensor_oled.state = "always"
            print("\nFinish recording\n Start parsing")
            self.parse_command()
            print("\nFinish parsing\n command: " + self.var)
            print("command mapping...")
            self.map_commands()
            print("exp : " + str(sensor_mysql.closeness))
             # voice_speaker에는 is_story_available이 아닌 is_new_story_available인데 잘못썼는지 확인할것!
            if(self.speaker.is_story_available()):
                self.speaker.new_story_available()
