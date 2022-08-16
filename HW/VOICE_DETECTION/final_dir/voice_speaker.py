import os
import sensor_touch


class Speaker():
    def __init__(self):
        self.prev_closeness = sensor_touch.closeness

    def speak_out(self, filename):
        cmd = "aplay " + filename
        os.system(cmd)

    def speak_story(self):
        if(sensor_touch.closeness < 100):
            self.speak_out("/home/pi/WAVEGO/RPi/voice_data/story1.wav")
        elif(sensor_touch.closeness < 200):
            self.speak_out("/home/pi/WAVEGO/RPi/voice_data/story2.wav")
        elif(sensor_touch.closeness < 300):
            self.speak_out("/home/pi/WAVEGO/RPi/voice_data/story3.wav")
        elif(sensor_touch.closeness < 400):
            self.speak_out("/home/pi/WAVEGO/RPi/voice_data/story4.wav")
        else:
            self.speak_out("/home/pi/WAVEGO/RPi/voice_data/story5.wav")

    def new_story_available(self):
        self.speak_out(
            "/home/pi/WAVEGO/RPi/voice_data/new_story_available.wav")

    def is_new_story_available(self):
        result = False
        if(self.prev_closeness < 100 and sensor_touch.closeness>=100):
            result = True 
        elif(self.prev_closeness < 200 and sensor_touch.closeness>=200):
            result = True 
        elif(self.prev_closeness < 300 and sensor_touch.closeness>=300):
            result = True
        elif(self.prev_closeness < 400 and sensor_touch.closeness>=400):
            result = True
        
        self.prev_closeness = sensor_touch.closeness
        return result

# if __name__ == '__main__':
#     speaker = Speaker()
#     while(1):        
#         print(sensor_touch.closeness)
#         if(speaker.is_new_story_available()):
#             speaker.new_story_available()
#             speaker.speak_story()