import porcupine_custom
import sys
import time
from threading import Thread
'''
TODO:
- RPI 동작 테스트
- 참고: https://gist.github.com/ruedesign/5218221
'''
class DetectHotword(Thread):
    def __init__(self):
        Thread.__init__(self)
        self.kill_received = False
    def run(self):
        while not self.kill_received:
            if(porcupine_custom.hot_word_flag):
                print("Hotword detected")
                time.sleep(0.1)
                
                
def has_live_threads(threads):
    for t in threads:
        if t.is_alive():
            return True


if __name__ == "__main__":    
    args=porcupine_custom.porcupine_parsing()
    threads=[]
    th1 = porcupine_custom.PorcupineCustom(
        access_key=args.access_key,
        library_path=args.library_path,
        model_path=args.model_path,
        keyword_paths=args.keyword_paths,
        sensitivities=args.sensitivities,
        output_path=args.output_path,
        input_device_index=args.audio_device_index)

    th2 = detect_hotword()
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
    