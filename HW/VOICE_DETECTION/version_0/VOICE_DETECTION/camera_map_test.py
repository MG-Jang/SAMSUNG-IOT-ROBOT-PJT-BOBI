'''
# test file for merging porcupine & google_stt
# for replacing camera_opencv.commandAct
#
# Modification history
#   Created by Dongwon Kim on 04 Aug, 2022 
'''


def commandAct(act, inputA):
    if act == 'forward':
        print("forward")
    elif act == 'backward':
        print("backward")
    elif act == 'left':
        print("left")
    elif act == 'right':
        print("right")
    elif act == 'DS':
        print("DS")
    elif act == 'TS':
        print("TS")
    elif act == 'up':
        print("up")
    elif act == 'down':
        print("down")
    elif act == 'UDstop':
        print("UDstop")
    elif act == 'lookleft':
        print("lookleft")
    elif act == 'lookright':
        print("lookright")
    elif act == 'LRstop':
        print("LRstop")

    elif act == 'jump':
        print("jump")
    elif act == 'handshake':
        print("steady")
    elif act == 'steady':
        print("steady")
    elif act == 'steadyOff':
        print("steadyOff")
