import os
import stt
import porcupine_custom
import sys
import time
from threading import Thread
from voice_recognition import VoiceRecognition

'''
TODO
- picovoice에서 mic를 쓰고 있어서 stt에서 사용할 수 없는 듯?????
- rpi에서 이 파일이 돌아가는 것까지 체크 완료
- 그러나 마이크 busy여서 stt thread는 처음 불렀을 때 죽음
'''

class DetectHotword(Thread):
    def __init__(self):
        Thread.__init__(self)
        self.kill_received = False
        self.stt = VoiceRecognition()

    def run(self):
        while not self.kill_received:
            if(porcupine_custom.hot_word_flag):
                print("Hotword detected")
                self.stt.run()
                time.sleep(0.1)


def has_live_threads(threads):
    for t in threads:
        if t.is_alive():
            return True


if __name__ == "__main__":
    args = porcupine_custom.porcupine_parsing()
    threads = []
    th1 = porcupine_custom.PorcupineCustom(
        access_key=args.access_key,
        library_path=args.library_path,
        model_path=args.model_path,
        keyword_paths=args.keyword_paths,
        sensitivities=args.sensitivities,
        output_path=args.output_path,
        input_device_index=args.audio_device_index)

    th2 = DetectHotword()
    threads.append(th1)
    threads.append(th2)
    th1.start()
    th2.start()

    while has_live_threads(threads):
        try:
            for t in threads:
                if t is not None and t.is_alive():
                    t.join(1)
        except KeyboardInterrupt:
            print("Sending kill to threads")
            for t in threads:
                t.kill_received = True

    print("Exited")
