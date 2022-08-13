:::::::::::::::::::::::::::::::::::
:: batch file for testing paho mqtt in windows10
:: 
:: created by Dongwon Kim on 01 Aug, 2022
:::::::::::::::::::::::::::::::::::
@echo off
setlocal

ECHO Starting paho publish testing in windows...
CD C:\Program Files\mosquitto

if "%*" == "" goto ERROR

mosquitto_pub -h %1 -t "testuser/move/forward" -m forward
mosquitto_pub -h %1 -t "testuser/move/backward" -m backward
mosquitto_pub -h %1 -t "testuser/move/left" -m left
mosquitto_pub -h %1 -t "testuser/move/right" -m right
mosquitto_pub -h %1 -t "testuser/voice/torobot" -m torobot
mosquitto_pub -h %1 -t "testuser/powersaving/on" -m poweron
mosquitto_pub -h %1 -t "testuser/powersaving/off" -m poweroff
goto QUIT

:ERROR
echo [ERROR] USAGE: paho_publish_test.bat broker_ip_address

:QUIT
PAUSE
