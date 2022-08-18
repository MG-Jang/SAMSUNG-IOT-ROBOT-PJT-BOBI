# robot.py
98번째줄 부터~
```python
def stayLow():
	dataCMD = json.dumps({'var':"funcMode", 'val':2})
	ser.write(dataCMD.encode())
	print('robot-staylow')
	
def sit():
	dataCMD = json.dumps({'var':"funcMode", 'val':10})
	ser.write(dataCMD.encode())
	print('robot-sit')

def standUp():
	dataCMD = json.dumps({'var':"funcMode", 'val':11})
	ser.write(dataCMD.encode())
	print('robot-standup')

def leftHand():
	dataCMD = json.dumps({'var':"funcMode", 'val':12})
	ser.write(dataCMD.encode())
	print('robot-lefthand')
	
def rightHand():
	dataCMD = json.dumps({'var':"funcMode", 'val':13})
	ser.write(dataCMD.encode())
	print('robot-righthand')

def lower():
	dataCMD = json.dumps({'var':"funcMode", 'val':14})
	ser.write(dataCMD.encode())
	print('robot-lower')

def upper():
	dataCMD = json.dumps({'var':"funcMode", 'val':15})
	ser.write(dataCMD.encode())
	print('robot-upper')
```
+ [WAVEGO.ino](#wavegoino)에서 추가해 놓은 행동 함수들의 funcMode 번호에 따라서 이를 robot.py에도 함수로 추가해놓음





# WAVEGO.ino
1057번째 줄부터~
```c
void functionSit(){
  // 앉기
  for(float i = 0; i<=1; i+=0.02){
    singleLegCtrl(3,  besselCtrl(WALK_EXTENDED_X, 0, i), besselCtrl(WALK_HEIGHT, WALK_HEIGHT_MAX, i), besselCtrl(WALK_EXTENDED_Z, -15, i));
    singleLegCtrl(1,  besselCtrl(WALK_EXTENDED_X, 0, i), besselCtrl(WALK_HEIGHT, WALK_HEIGHT_MAX, i), besselCtrl(WALK_EXTENDED_Z, -15, i));

    singleLegCtrl(2,  -WALK_EXTENDED_X, besselCtrl(WALK_HEIGHT, WALK_HEIGHT_MIN-10, i), besselCtrl(WALK_EXTENDED_Z, 2*WALK_EXTENDED_Z, i));
    singleLegCtrl(4,  -WALK_EXTENDED_X, besselCtrl(WALK_HEIGHT, WALK_HEIGHT_MIN-10, i), besselCtrl(WALK_EXTENDED_Z, 2*WALK_EXTENDED_Z, i));

    GoalPosAll();
    delay(1);
  }
}

void functionStandUp(){
  // 일어나기
  for(float i = 0; i<=1; i+=0.02){
    singleLegCtrl(3,  besselCtrl(0, WALK_EXTENDED_X, i), besselCtrl(WALK_HEIGHT_MAX, WALK_HEIGHT, i), besselCtrl(-15, WALK_EXTENDED_Z, i));
    singleLegCtrl(1,  besselCtrl(0, WALK_EXTENDED_X, i), besselCtrl(WALK_HEIGHT_MAX, WALK_HEIGHT, i), besselCtrl(-15, WALK_EXTENDED_Z, i));

    singleLegCtrl(2,  -WALK_EXTENDED_X, besselCtrl(WALK_HEIGHT_MIN-10, WALK_HEIGHT, i), besselCtrl(2*WALK_EXTENDED_Z, WALK_EXTENDED_Z, i));
    singleLegCtrl(4,  -WALK_EXTENDED_X, besselCtrl(WALK_HEIGHT_MIN-10, WALK_HEIGHT, i), besselCtrl(2*WALK_EXTENDED_Z, WALK_EXTENDED_Z, i));

    GoalPosAll();
    delay(1);
  }
}

void functionRightHand(){
  // 오른손 악수
  for(float i = 0; i<=1; i+=0.02){
    singleLegCtrl(1,  besselCtrl(WALK_EXTENDED_X, 0, i), besselCtrl(WALK_HEIGHT, WALK_HEIGHT_MAX, i), besselCtrl(WALK_EXTENDED_Z, -15, i));
    singleLegCtrl(3,  besselCtrl(WALK_EXTENDED_X, 0, i), besselCtrl(WALK_HEIGHT, WALK_HEIGHT_MAX, i), WALK_EXTENDED_Z);

    singleLegCtrl(2,  -WALK_EXTENDED_X, besselCtrl(WALK_HEIGHT, WALK_HEIGHT_MIN-10, i), besselCtrl(WALK_EXTENDED_Z, 2*WALK_EXTENDED_Z, i));
    singleLegCtrl(4,  -WALK_EXTENDED_X, besselCtrl(WALK_HEIGHT, WALK_HEIGHT_MIN-10, i), besselCtrl(WALK_EXTENDED_Z, 2*WALK_EXTENDED_Z, i));

    GoalPosAll();
    delay(1);
  }

  for(float i = 0; i<=1; i+=0.02){
    singleLegCtrl(3,  besselCtrl(0, WALK_RANGE/2+WALK_EXTENDED_X, i), besselCtrl(WALK_HEIGHT_MAX, WALK_HEIGHT_MIN, i), besselCtrl(WALK_EXTENDED_Z, 0, i));

    GoalPosAll();
    delay(1);
  }
  
  delay(2000);
  
  for(float i = 0; i<=1; i+=0.02){
    singleLegCtrl(1,  besselCtrl(0, WALK_EXTENDED_X, i), besselCtrl(WALK_HEIGHT_MAX, WALK_HEIGHT, i), besselCtrl(-15, WALK_EXTENDED_Z, i));
    singleLegCtrl(3,  besselCtrl(WALK_RANGE/2+WALK_EXTENDED_X, WALK_EXTENDED_X, i), besselCtrl(WALK_HEIGHT_MIN, WALK_HEIGHT, i), besselCtrl(0, WALK_EXTENDED_Z, i));

    singleLegCtrl(2,  -WALK_EXTENDED_X, besselCtrl(WALK_HEIGHT_MIN-10, WALK_HEIGHT, i), besselCtrl(2*WALK_EXTENDED_Z, WALK_EXTENDED_Z, i));
    singleLegCtrl(4,  -WALK_EXTENDED_X, besselCtrl(WALK_HEIGHT_MIN-10, WALK_HEIGHT, i), besselCtrl(2*WALK_EXTENDED_Z, WALK_EXTENDED_Z, i));

    GoalPosAll();
    delay(1);
  }
}

void functionLeftHand(){
  // 왼손
  // 뒷다리 앉고 앞다리 각도 조절(왼손 들기)
  for(float i = 0; i<=1; i+=0.02){
    singleLegCtrl(3,  besselCtrl(WALK_EXTENDED_X, 0, i), besselCtrl(WALK_HEIGHT, WALK_HEIGHT_MAX, i), besselCtrl(WALK_EXTENDED_Z, -15, i));
    singleLegCtrl(1,  besselCtrl(WALK_EXTENDED_X, 0, i), besselCtrl(WALK_HEIGHT, WALK_HEIGHT_MAX, i), WALK_EXTENDED_Z);

    singleLegCtrl(2,  -WALK_EXTENDED_X, besselCtrl(WALK_HEIGHT, WALK_HEIGHT_MIN-10, i), besselCtrl(WALK_EXTENDED_Z, 2*WALK_EXTENDED_Z, i));
    singleLegCtrl(4,  -WALK_EXTENDED_X, besselCtrl(WALK_HEIGHT, WALK_HEIGHT_MIN-10, i), besselCtrl(WALK_EXTENDED_Z, 2*WALK_EXTENDED_Z, i));

    GoalPosAll();
    delay(1);
  }

  // 들은 왼손 내밀기
  for(float i = 0; i<=1; i+=0.02){
    singleLegCtrl(1,  besselCtrl(0, WALK_RANGE/2+WALK_EXTENDED_X, i), besselCtrl(WALK_HEIGHT_MAX, WALK_HEIGHT_MIN, i), besselCtrl(WALK_EXTENDED_Z, 0, i));

    GoalPosAll();
    delay(1);
  }
  
  delay(3000);
  
  // 손 내리고 원위치
  for(float i = 0; i<=1; i+=0.02){
    singleLegCtrl(3,  besselCtrl(0, WALK_EXTENDED_X, i), besselCtrl(WALK_HEIGHT_MAX, WALK_HEIGHT, i), besselCtrl(-15, WALK_EXTENDED_Z, i));
    singleLegCtrl(1,  besselCtrl(WALK_RANGE/2+WALK_EXTENDED_X, WALK_EXTENDED_X, i), besselCtrl(WALK_HEIGHT_MIN, WALK_HEIGHT, i), besselCtrl(0, WALK_EXTENDED_Z, i));

    singleLegCtrl(2,  -WALK_EXTENDED_X, besselCtrl(WALK_HEIGHT_MIN-10, WALK_HEIGHT, i), besselCtrl(2*WALK_EXTENDED_Z, WALK_EXTENDED_Z, i));
    singleLegCtrl(4,  -WALK_EXTENDED_X, besselCtrl(WALK_HEIGHT_MIN-10, WALK_HEIGHT, i), besselCtrl(2*WALK_EXTENDED_Z, WALK_EXTENDED_Z, i));

    GoalPosAll();
    delay(1);
  }
}

void functionLower(){
  // 엎드려
  for(float i = 0; i<=1; i+=0.02){
    standUp(besselCtrl(WALK_HEIGHT, WALK_HEIGHT_MIN, i));
    GoalPosAll();
    delay(1);
  }
}

void functionUpper(){
  // 일어나
  for(float i = 0; i<=1; i+=0.02){
    standUp(besselCtrl(WALK_HEIGHT_MIN, WALK_HEIGHT, i));
    GoalPosAll();
    delay(1);
  }
}

// base move ctrl.
void robotCtrl(){
  // move ctrl.
  if(!debugMode && !funcMode){
    if(moveFB == 0 && moveLR == 0 && STAND_STILL == 0){
      standMassCenter(0, 0);
      GoalPosAll();
      STAND_STILL = 1;
      GLOBAL_STEP = 0;
      delay(STEP_DELAY);
    }
    else if(moveFB == 0 && moveLR == 0 && STAND_STILL == 1){
      GoalPosAll();
      delay(STEP_DELAY);
    }
    else{
      STAND_STILL = 0;
      gestureUD = 0;
      gestureLR = 0;
      if(GLOBAL_STEP > 1){GLOBAL_STEP = 0;}
      if(moveFB == 1 && moveLR == 0){gaitTypeCtrl(GLOBAL_STEP, 0, 0);}
      else if(moveFB == -1 && moveLR == 0){gaitTypeCtrl(GLOBAL_STEP, 180, 0);}
      else if(moveFB == 1 && moveLR == -1){gaitTypeCtrl(GLOBAL_STEP, 30, 0);}
      else if(moveFB == 1 && moveLR == 1){gaitTypeCtrl(GLOBAL_STEP, -30, 0);}
      else if(moveFB == -1 && moveLR == 1){gaitTypeCtrl(GLOBAL_STEP, -120, 0);}
      else if(moveFB == -1 && moveLR == -1){gaitTypeCtrl(GLOBAL_STEP, 120, 0);}
      else if(moveFB == 0 && moveLR == -1){gaitTypeCtrl(GLOBAL_STEP, 0, -1);}
      else if(moveFB == 0 && moveLR == 1){gaitTypeCtrl(GLOBAL_STEP, 0, 1);}
      GoalPosAll();
      GLOBAL_STEP += STEP_ITERATE;
      delay(STEP_DELAY);
    }
  }
  // function ctrl.
  else if(!debugMode && funcMode){
    if(funcMode == 1){
      accXYZUpdate();
      balancing();
      GoalPosAll();
    }
    else if (funcMode == 2){
      Serial.println("stayLow");
      functionStayLow();
      funcMode = 0;
    }
    else if (funcMode == 3){
      Serial.println("handshake");
      functionHandshake();
      funcMode = 0;
    }
    else if (funcMode == 4){
      Serial.println("Jump");
      functionJump();
      funcMode = 0;
    }
    else if (funcMode == 5){
      Serial.println("ActionA");
      functionActionA();
      funcMode = 0;
    }
    else if (funcMode == 6){
      Serial.println("ActionB");
      functionActionB();
      funcMode = 0;
    }
    else if (funcMode == 7){
      Serial.println("ActionC");
      functionActionC();
      funcMode = 0;
    }
    else if (funcMode == 8){
      Serial.println("InitPos");
      initPosAll();
    }
    else if (funcMode == 9){
      Serial.println("MiddlePos");
      middlePosAll();
    }
    else if (funcMode == 10){
      Serial.println("Sit");
      functionSit();
      funcMode = 0;
    }
    else if (funcMode == 11){
      Serial.println("StandUp");
      functionStandUp();
      funcMode = 0;
    }
    else if (funcMode == 12){
      Serial.println("LeftHand");
      functionLeftHand();
      funcMode = 0;
    }
    else if (funcMode == 13){
      Serial.println("RightHand");
      functionRightHand();
      funcMode = 0;
    }
    else if (funcMode == 14){
      Serial.println("Lower");
      functionLower();
      funcMode = 0;
    }
    else if (funcMode == 15){
      Serial.println("Upper");
      functionUpper();
      funcMode = 0;
    }
```
+ 각 행동 별 함수 추가
+ 행동 함수랑 연결 지어서 funcMode 번호 부여


### **robot.py랑 연결했을 때 잘 작동하는 것을 확인ლ(╹◡╹ლ)**
