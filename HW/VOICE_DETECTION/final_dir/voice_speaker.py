import os
import oled_touch

class Speaker():
    def __init__(self):
        #super(Speaker, self).__init__()
        self.prev_closeness = oled_touch.closeness

    def speak_out(self, filename):
        cmd = "aplay "+ filename
        os.system(cmd)

    def speak_story(self):
        if(oled_touch.closeness < 100):
            self.speak_out("/home/pi/WAVEGO/RPi/voice_data/story1.wav")
        elif(oled_touch.closeness < 200):
            self.speak_out("/home/pi/WAVEGO/RPi/voice_data/story2.wav")
        elif(oled_touch.closeness < 300):
            self.speak_out("/home/pi/WAVEGO/RPi/voice_data/story3.wav")
        elif(oled_touch.closeness < 400):
            self.speak_out("/home/pi/WAVEGO/RPi/voice_data/story4.wav")
        else:
            self.speak_out("/home/pi/WAVEGO/RPi/voice_data/story5.wav")

    def new_story_available(self):
        self.speak_out("/home/pi/WAVEGO/RPi/voice_data/new_story_available.wav")


if __name__=='__main__':
    speaker = Speaker()
    speaker.speak_out("/home/pi/WAVEGO/RPi/voice_data/story1.wav")
    speaker.new_story_available()