## XML 파일 만들기

### 해당 사이트에서 압축파일 다운받기

- [https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=hihimani&logNo=80154867344](https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=hihimani&logNo=80154867344)
- 사이트에서 나온 설명대로 따라하기

### Google에서 여러장의 사진 다운 쉽게 받기

- [https://chrome.google.com/webstore/detail/image-downloader/cnpniohnfphhjihaiiggeabnkjhpaldj?hl=ko&](https://chrome.google.com/webstore/detail/image-downloader/cnpniohnfphhjihaiiggeabnkjhpaldj?hl=ko&)
- 이미지 다운로더 확장 프로그램을 통해 여러장 쉽게 다운받음
- 다운받은 이미지 확장자는 `jfif`이다.

### 문제점 & 해결책

1. 이미지 확장자가 `bmp` 여야 하는듯, 따라서 모든 이미지 확장자를 `jfif` 에서 `bmp` 로 바꿔줬음

- 쉽게 바꿔주는 방법 - `ren *.기존 확장자 *.바꾸고 싶은 확장자` 를 bat 확장자로 만들어서 실행시키기
  - [https://jsix.tistory.com/1111](https://jsix.tistory.com/1111)

2. tbb.dll 에러

- tbb.dll이 없어서 실행이 안된다고 함, 따라서 해당 폴더 내부에 tbb.dll을 설치 후 넣어줌
  - [https://decode.tistory.com/44](https://decode.tistory.com/44)

## 객체인식 테스트

- 얼굴인식 코드에서 xml변수 값만 교체한 코드로 테스트
- [colab](https://colab.research.google.com/)에서 테스트 함
- 좌측 파일 리스트에 테스트할 이미지와 xml 파일을 넣어줘야 함
  - 테스트 이미지 : `test_img` 폴더 내부의 이미지로 테스트 해봄
  - xml : 이미지를 교육시켜 나온 산출물인 `output.xml`

`테스트 코드`

```python
import numpy as np
import cv2
from matplotlib import pyplot as plt
%matplotlib inline

image = cv2.imread('img1.jfif')
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

plt.imshow(gray, cmap='gray')
plt.xticks([]), plt.yticks([])
#plt.show()

xml = 'output.xml'
face_cascade = cv2.CascadeClassifier(xml)
faces = face_cascade.detectMultiScale(gray, 1.2, 5)

#print("Number of faces detected: " + str(len(faces)))

if len(faces):
    for (x,y,w,h) in faces:
        cv2.rectangle(image,(x,y),(x+w,y+h),(255,0,0),2)

plt.imshow(cv2.cvtColor(image, cv2.COLOR_BGR2RGB), cmap='gray')
plt.xticks([]), plt.yticks([])
plt.show()
```

- 결과

![image](https://user-images.githubusercontent.com/99601412/183321105-0877179d-3bc3-4106-95ad-8b3eef2d5d34.png)

## 실제 테스트할 객체 학습

1. `object_img`내부에 있는 사진들을 positive로 교육시켰다.
2. 100장 정도의 객체와 무관한 사진을 negative를 이용하여 교육시켰다.
3. 해당 사진들을 통해 xml 파일을 제작하여 진행할 예정이다.
