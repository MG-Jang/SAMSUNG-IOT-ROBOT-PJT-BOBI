---
author: Dongwon Kim
date: 2022-07-27
excerpt: "why docker"
---
## 왜 Docker를 사용해야 하는가

- 서버를 pet 처럼 생각해야 함(실제 강연자 워딩)
    - 오래 살아야 하고 돌봐줘야 하고 아프지 않아야 함
- dependency, server 이슈 등 서버 운영 매우 힘듦

→ Docker to the Rescue

- Epheneral: 서버가 죽으면 그냥 바꾸면 됨
- build → ship → run image
- CI/CD(test & deploy without stop), different version(다른 버전은 install 없이 쉽게 사용 가능), roll forward(when defect, just start new server)

## 참조
- [How to Get Started with Docker](https://youtu.be/iqqDU2crIEQ)