## 이미지 출력 테스트

- I2C 통신 OLED 세팅이 끝나고 가정하자 ⇒ 128x64 I2C 통신 OLED

`테스트 코드`

```python
# OLED 출력 테스트
python3 Adafruit_Python_SSD1306/examples/image.py
```

`image.py`

```python
# Copyright (c) 2014 Adafruit Industries
# Author: Tony DiCola
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
# THE SOFTWARE.
import time

import Adafruit_GPIO.SPI as SPI
import Adafruit_SSD1306

from PIL import Image

# Raspberry Pi pin configuration:
RST = None
# Note the following are only used with SPI:
DC = 23
SPI_PORT = 0
SPI_DEVICE = 0

# Beaglebone Black pin configuration:
# RST = 'P9_12'
# Note the following are only used with SPI:
# DC = 'P9_15'
# SPI_PORT = 1
# SPI_DEVICE = 0

# 128x32 display with hardware I2C:
#disp = Adafruit_SSD1306.SSD1306_128_32(rst=RST)

# 128x64 display with hardware I2C:
disp = Adafruit_SSD1306.SSD1306_128_64(rst=RST)

# 128x32 display with hardware SPI:
# disp = Adafruit_SSD1306.SSD1306_128_32(rst=RST, dc=DC, spi=SPI.SpiDev(SPI_PORT, SPI_DEVICE, max_speed_hz=8000000))

# 128x64 display with hardware SPI:
# disp = Adafruit_SSD1306.SSD1306_128_64(rst=RST, dc=DC, spi=SPI.SpiDev(SPI_PORT, SPI_DEVICE, max_speed_hz=8000000))

# Initialize library.
disp.begin()

# Clear display.
disp.clear()
disp.display()

# Load image based on OLED display height.  Note that image is converted to 1 bit color.
if disp.height == 64:
    image = Image.open('happycat_oled_64.ppm').convert('1')
else:
    image = Image.open('happycat_oled_32.ppm').convert('1')

# Alternatively load a different format image, resize it, and convert to 1 bit color.
#image = Image.open('happycat.png').resize((disp.width, disp.height), Image.ANTIALIAS).convert('1')

# Display image.
disp.image(image)
disp.display()
```

### 출력 가능 이미지 확장자

- ppm만 출력되는지 알았지만, `jpg, png` 모두 출력된다.

### 원하는 이미지 출력

- 원하는 이미지를 `128 x 64` 로 해상도를 조정하고 해당 코드가 포함된 폴더 내에 이미지 넣기
- `go.png` 라고 하면 다음과 같이 변경하면 된다.
- if문을 없애고 `image = Image.open('go.png').convert('1')` 해당 코드만 입력해도 된다.

```python
# Load image based on OLED display height.  Note that image is converted to 1 bit color.
if disp.height == 64:
    image = Image.open('go.png').convert('1')
else:
    image = Image.open('happycat_oled_32.ppm').convert('1')
```

### 필요한 아이콘 구할 수 있는 사이트

[https://www.flaticon.com/kr/?gclid=Cj0KCQjwrs2XBhDjARIsAHVymmSWWmI9dyYNlqNn-H62gr_mrcCWHNjyGmHSaFVqcrGX0gL7RTCYkZkaApqHEALw_wcB&gclsrc=aw.ds](https://www.flaticon.com/kr/?gclid=Cj0KCQjwrs2XBhDjARIsAHVymmSWWmI9dyYNlqNn-H62gr_mrcCWHNjyGmHSaFVqcrGX0gL7RTCYkZkaApqHEALw_wcB&gclsrc=aw.ds)
