# backend/web/Dockerfile
# set base image
FROM python:3.8.10

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /code

# project setting
# install dependencies
COPY requirements.txt ./
RUN python3 -m pip install --upgrade pip setuptools
RUN pip install -r requirements.txt

COPY . ./
EXPOSE 8000