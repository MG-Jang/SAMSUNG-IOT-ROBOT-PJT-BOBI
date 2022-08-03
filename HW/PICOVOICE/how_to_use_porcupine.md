- anaconda에서 가상 환경 picovoice를 생성하여 진행
- `pvporcupinedemo` 설치하여 예제 진행
- `porcupine_demo_mic --access_key YN4dbG65PZ6tFVT+e0w1eAMCE2IL0YoDDY7b+yrtGDn9o1N5W+P2HQ== --keywords picovoice` 실행
    - picovoice 인식 잘 됨
- 진행을 위해 demo repo의 `porcupine_demo_mic.py` 를 그대로 복붙해서 가져옴
- `python porcupine_demo_mic.py --access_key YN4dbG65PZ6tFVT+e0w1eAMCE2IL0YoDDY7b+yrtGDn9o1N5W+P2HQ== --keywords picovoice`
- 수정을 위해 해당 코드를 `porcupine_custom.py` 에 넣고 고치는 중
- custom wakeup
    - hi bobi는 bobi가 영어로 발음이 등록되어 있지 않아서 안됨, hi boebi도 마찬가지
    - `하이 보비` 는 한국어로 진행하니 됨
    - 학습 시킨 거 picovoice web에서 테스트했을 때는 잘 됨
- RPI에서 실행
    - /home/pi/porcupine 폴더 내에 위치 시킴
        
        ```
        /home/pi/porcupine
        	|-- porcupine_params_ko.pv
        	|-- porcupine_custom.py
        	|-- hi_bobi_ko_rpi.ppn
        ```
        
    - `python3 porcupine_custom.py --access_key YN4dbG65PZ6tFVT+e0w1eAMCE2IL0YoDDY7b+yrtGDn9o1N5W+P2HQ== --keyword_paths /home/pi/porcupine/hi_bobi_ko_rpi.ppn --model_path /home/pi/porcupine/porcupine_params_ko.pv`
        
        실행 결과 listening hi 라고 표시되긴 하지만 실제로 해보면 hi 로 하면 인식이 안 되고 hi bobi라고 해야 인식이 되는 것으로 보아 잘 동작함
        
    - 긴 options들을 default로 지정하려고 2시간 동안 노력하였으나 안 되어서 포기
        - 계속 OSError: Couldn't find keyword file at 'h'. 가 뜨면서 path를 제대로 읽어오지 못함

## 참조

- [picovoice porcupine demo](https://github.com/Picovoice/porcupine/tree/master/demo/python)