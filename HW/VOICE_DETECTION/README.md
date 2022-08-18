---
last modified: 2022-08-11
---
# voice recognition

## tech stack
- google stt
- picovoice porcupine
- paho.mqtt
- AWS S3

## File structure
```
│  README.md
│  voice.py
│  voice_porcupine_custom.py
│  voice_recognition.py
│  voice_requirements.txt
│  voice_s3_mssg.py
│
└─voice_data
        hi_bobi_ko_rpi.ppn
        keywords_LICENSE.txt
        porcupine_params_ko.pv
        s07p1a208-bobi-e9b2a5e5d1c0.json
```
- voice.py
    - run thread
        - th1: porcupine
        - th2: google stt & cmd matching
    - need voice_porcupine_custom.py, voice_recognition.py in the same dir
    - terminate code with `ctrl + c`
- voice_porcupine_custom.py
    - get args
        - must include --keyword_paths, --model_path, --user_id for this pjt
        - can check mic devices index using --show_audio_devices
    - detect hot word using porcupine
    - referencing porcupine_demo_mic.py from picovoice
- voice_requirements.txt
    - requirements for voice recognition
    - to solve below error, do followings
        - error: ImportError: /lib/arm-linux-gnueabihf/libm.so.6: version `GLIBC_2.29' not found (required by /home/pi/google_stt/env/lib/python3.7/site-packages/grpc/_cython/cygrpc.cpython-37m-arm-linux-gnueabihf.so)
        - solution
        ```
        The solution that worked for me is adding /home/user/.local/bin to PATH. For this you need to add the following line to your shell config file (.bashrc or .zshrc)
        export PATH="$HOME/.local/bin:$PATH"
        After doing this, run source ~/.zshrc or source ~/.bashrc
        This because apparently pip installs packages in a different source that is added to PATH by default

        After doing this the problem was still happening so I found this post https://groups.google.com/g/grpc-io/c/vjbL3IdZ2Vk/m/EcKSeD4eAgAJ
        According to my research the default installation of the OS manages a different version of GLIBC that is a dependency of grpcio so what finally fixed it for me was uninstalling grpcio and installing it again with the following commands
        1. pip uninstall grpcio
        2. pip uninstall grpcio-status

        3. pip install grpcio==1.44.0 --no-binary=grpcio
        4. pip install grpcio-tools==1.44.0 --no-binary=grpcio-tools
        NOTE: Te installation of each package takes a considerable amount of time (15-20 min) 
        ```
        [reference](https://groups.google.com/g/grpc-io/c/T91EyO81c8I)
- voice_s3_mssg.py
    - VoiceMessage class
        - upload and download voice file to/from S3
- voice_recognition.py
    - VoiceRecognition class
        - when voice_porcupine_custom.hot_word_flag is high,
            - record cmd for 3 seconds 
            - parse result of the google stt
            - map command
        - cmd
            - 앉아, 일어나, 오른손, 왼손, 엎드려, 잘했어, 메시지
            - cf) 메시지 보내줘 also works
            - call function of robot.py according to the cmd
        - record voice when the cmd == 메시지 for 7 seconds
            - store it in S3
            - publish MQTT mssg to [user id]/voice/toweb
- voice_data/hi_bobi_ko_rpi.ppn
    - custom wake up word in korean '하이 보비'
    - created from picovoice porcupine
    - created for RPI
- voice_data/keywords_LICENSE.txt
    - license for hi_bobi_ko_rpi.ppn
- voice_data/porcupine_params_ko.pv
    - korean languange model form porcupine
    - used model from porcupine
- voice_data/s07p1a208-bobi-e9b2a5e5d1c0.json
    - google stt access key

## RPI information
- HW: Raspberry Pi 4 Model B Rev 1.2
- OS: Raspbian GNU/Linux 10 (buster)
- mic: USB mic (need two of them)
## How to use
1. make and use virtual python env
    ```
    $ python3 -m venv env
    $ source env/bin/activate
    ```
2. install dependencies
    ```
    $ (env) pip install -r voice_requirements.txt
    ```
    - when voice file not woring with GLIBC error, follow above instruction
    - it could take more than 1 hour
3. get google stt key from [google stt console](https://cloud.google.com/speech-to-text/docs/before-you-begin) and put the json file in the RPI
4. register the google stt json key
    ```
    $ sudo vi ~/.bashrc
    ```
    add the following
    - `export GOOGLE_APPLICATION_CREDENTIALS="KEY_PATH"`
    - save and close
5. get porcupine access key from [picovoice console](https://picovoice.ai/docs/quick-start/porcupine-python/) and copy the access key
6. check the mic index
    ```
    $ (env) porcupine_demo_mic --show_audio_devices
    ```
    result is like
    ```    
    index: 0, device name: USB PnP Sound Device Analog Mono
    index: 1, device name: USB PnP Sound Device Analog Mono
    index: 2, device name: Monitor of Built-in Audio Analog Stereo
    ```
    find USB mic index(for this example, 0 and 1)
6. run the code
    ```
    $ (env) python3 voice.py --access_key [your porcupine access key] --keyword_paths /home/pi/WAVEGO/RPi/voice_data/hi_bobi_ko_rpi.ppn --model_path /home/pi/WAVEGO/RPi/voice_data/hi_bobi_ko_rpi.ppn/porcupine_params_ko.pv --audio_device_index [found index] --user_id [your user id(primary key) from DB ]
    ```
## result
1. say '하이 보비'
    ```
    [2022-08-11 14:29:56.401842] Detected hi 
    Hotword detected
    ```
2. say command
    ```
    Recording WAVE '/home/pi/voice_recognition/cmd.wav' : Signed 16 bit Little Endian, Rate 48000 Hz, Mono
    #+                                                 | 01%
    Finish recording
    Start parsing

    Finish parsing
    command: 잘했어
    command mapping...
    ```
3. watch the robot
4. especially for '메시지', need to record voice mssg which will be sent to the web page