## BoBi_backup

> 2022 SSAFY 공통 프로젝트 : Care robot BoBi - repository for EC2 server upload [참고 링크](https://nerogarret.tistory.com/45)



### How to update

- EC2 (mobaxterm 이용)

  ```bash
  $ cd /srv/bobi_backup
  ```

  

- git pull

  ```bash
  $ source myvenv/bin/activate
  ```

  ```bash
  (myvenv) ubuntu@ip-172-31-46-44:~$ cd /srv/bobi_backup
  ```

  ```bash
  (myvenv) ubuntu@ip-172-31-46-44:/srv/templix-backup$ git pull origin master
  ```



- static files 모으기

  ```bash
  python3 manage.py collectstatic
  ```

  

- nginx 재등록

  ```bash
  sudo cp -f /srv/bobi_backup/.config/nginx/bobi_backend.conf /etc/nginx/sites-available/bobi_backend.conf
  ```

  ```bash
  sudo ln -sf /etc/nginx/sites-available/bobi_backend.conf /etc/nginx/sites-enabled/bobi_backend.conf
  ```

  

- restart

  ```bash
  sudo systemctl daemon-reload
  ```

  ```bash
  sudo systemctl restart uwsgi
  ```

  ```bash
  sudo systemctl restart nginx
  ```
  
  

[https://nerogarret.tistory.com/45]: 