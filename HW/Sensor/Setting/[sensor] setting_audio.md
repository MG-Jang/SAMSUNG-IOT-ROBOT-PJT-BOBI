## 오디오 출력 테스트

### 1. test.wav가 있는 경우

```python
aplay test.wav
```

### 2. Sound test

설치

```python
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install alsa-utils
```

드라이브 설치 확인

```python
sudo lsmod | grep bcm2835
```

정상

![image](https://user-images.githubusercontent.com/99601412/184351235-d93d89d1-eb94-44da-80c2-d06736c13544.png)

사운드 파일 실행

```python
aplay /usr/share/sounds/alsa/Side_Right.wav
```

## 정리

- 3.5mm 잭 이어폰 과 USB 이어폰은 아무 설치 없이 연결만 해도 들린다.
- 스피커 또한 다음과 같이 간단히 실행되는지도 테스트 해봐야한다.
- 블루투스 스피커로 테스트 해본 결과 잘 작동된다.

### 참고사이트

[https://kocoafab.cc/tutorial/view/340](https://kocoafab.cc/tutorial/view/340)

3.5mm 오디오 잭으로 테스트

```python
sudo amixer cset numid=3 1
```

## 1. 3.5mm Jack

```python
sudo raspi-config
9. Advanced Options
A9. Audio
1 Force 3.5mm jack
```

## 2. USB 스피커

```python
aplay -l
vi .asoundrc
```

```python
pcm.!default {
  type asym
  capture.pcm "mic"
  playback.pcm "speaker"
}
pcm.mic {
  type plug
  slave {
    pcm "hw:<card number>,<device number>"
  }
}
pcm.speaker {
  type plug
  slave {
    pcm "hw:<card number>,<device number>"
  }
}
```

```python
sudo reboot
speaker-test -t wav
```

### 참고사이트

[https://github.com/HUST-Robot/Capstone-design/issues/13](https://github.com/HUST-Robot/Capstone-design/issues/13)

## 3. 블루투스

### 블루투스 가능여부 확인

```python
pinout
bluetoothctl
show
```

### 참고사이트

[https://jvvp.tistory.com/1111](https://jvvp.tistory.com/1111)
