import time

import Adafruit_GPIO.SPI as SPI
import Adafruit_SSD1306

from PIL import Image

RST = None
disp = Adafruit_SSD1306.SSD1306_128_64(rst=RST)
disp.begin()
disp.clear()
disp.display()

im = Image.new('1', (128,64), 0) 
from PIL import ImageDraw
draw = ImageDraw.Draw(im)
box = (32,0,96,64)
draw.ellipse(box,fill = 1)

disp.image(im)
disp.display()

