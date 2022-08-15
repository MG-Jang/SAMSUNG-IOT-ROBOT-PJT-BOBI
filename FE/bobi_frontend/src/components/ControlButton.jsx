import React, { useEffect, useState } from "react";
import mqtt from 'mqtt/dist/mqtt';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronUp, faCircleChevronDown, faCircleChevronLeft, faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";


function ControlButton() {
  // userId 불러오기
  const [ userId, setUserId ] = useState([]);
  const [ isForward, setIsForward ] = useState(false);
  const [ isBackward, setIsBackward ] = useState(false);
  const [ isLeft, setIsLeft ] = useState(false);
  const [ isRight, setIsRight ] = useState(false);


  useEffect(() => {
    fetch("https://i7a208.p.ssafy.io/api/v1/users/1/")
      .then(res => {
        return res.json();
    })
      .then((data) => {
        setUserId(data["id"]);
    });
  }, []);

  // mqtt 연결

  const host = 'i7a208.p.ssafy.io';
  const port = '9001';
  const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;
  const connectUrl = `ws://${host}:${port}/mqtt`;
  const client = mqtt.connect(connectUrl, {
    clientId,
    clean: true,
    connectTimeout: 4000,
    reconnectPeriod: 1000,
  });

  // 움직임 구현 함수

  const moveForward = () => {
    const topic = `${userId}/move/forward`
    const payload = 'on'
    client.publish(topic, payload, error => {
      if (error) {
        console.log('Publish error: ', error);
      }
      console.log('forward!');
    });
    setIsForward(true);
  };

  const stopForward = () => {
    const topic = `${userId}/move/forward`
    const payload = 'off'
    client.publish(topic, payload, error => {
      if (error) {
        console.log('Publish error: ', error);
      }
      console.log('stopForward');
    });
    setIsForward(false);
  };

  const moveBack = () => {
    const topic = `${userId}/move/backward`
    const payload = 'on'
    client.publish(topic, payload, error => {
      if (error) {
        console.log('Publish error: ', error);
      }
      console.log('back!');
    });
    setIsBackward(true);
  }

  const stopBack = () => {
    const topic = `${userId}/move/backward`
    const payload = 'off'
    client.publish(topic, payload, error => {
      if (error) {
        console.log('Publish error: ', error);
      }
      console.log('stopBack');
    });
    setIsBackward(false);
  }

  const moveRight = () => {
    const topic = `${userId}/move/right`
    const payload = 'on'
    client.publish(topic, payload, error => {
      if (error) {
        console.log('Publish error: ', error);
      }
      console.log('right!');
    });
    setIsRight(true);
  }

  const stopRight = () => {
    const topic = `${userId}/move/right`
    const payload = 'off'
    client.publish(topic, payload, error => {
      if (error) {
        console.log('Publish error: ', error);
      }
      console.log('stopRight');
    });
    setIsRight(false);
  }

  const moveLeft = () => {
    const topic = `${userId}/move/left`
    const payload = 'on'
    client.publish(topic, payload, error => {
      if (error) {
        console.log('Publish error: ', error);
      }
      console.log('left!');
    });
    setIsLeft(true);
  }

  const stopLeft = () => {
    const topic = `${userId}/move/left`
    const payload = 'off'
    client.publish(topic, payload, error => {
      if (error) {
        console.log('Publish error: ', error);
      }
      console.log('stopLeft')
    });
    setIsLeft(false);
  }

  return (
    <div>
      <br />
      <div onPointerDown={() => moveForward()} onPointerUp={() => stopForward()} style={{width: "60px", margin:"0 auto"}}>
        {isForward
          ? <FontAwesomeIcon icon={faCircleChevronUp} style={{height: "55px", color:"#a6eae2"}}/>
          : <img style={{ height: "60px" }} src="https://cdn-icons-png.flaticon.com/512/992/992703.png"  alt="buttonForward"/>
        }
      </div>
      <div style={{display: "flex"}}>
        <div onPointerDown={() => moveLeft()} onPointerUp={() => stopLeft()} style={{width: "60px", margin:"0 35px 0 auto"}}>
          {isLeft
            ? <FontAwesomeIcon icon={faCircleChevronLeft} style={{height: "55px", color:"#a6eae2"}}/>
            : <img src="https://cdn-icons-png.flaticon.com/512/318/318276.png" style={{height:"60px"}} alt="buttonLeft"/>
          }
        </div>
        <div onPointerDown={() => moveRight()} onPointerUp={() => stopRight()} style={{width: "60px", margin:"0 auto 0 35px"}}>
          {isRight
            ? <FontAwesomeIcon icon={faCircleChevronRight} style={{height: "55px", color:"#a6eae2"}}/>
            : <img style={{ height: "60px" }} src="https://cdn-icons-png.flaticon.com/512/318/318275.png" alt="buttonRight" />
          }
        </div>
      </div>
      <div onPointerDown={() => moveBack()} onPointerUp={() => stopBack()} style={{width: "60px", margin:"0 auto"}}>
        {isBackward
          ? <FontAwesomeIcon icon={faCircleChevronDown} style={{height: "55px", color:"#a6eae2"}}/>
          : <img style={{ height: "60px" }} src="https://cdn-icons-png.flaticon.com/512/318/318278.png" alt="buttonBackward"/>
        }
      </div>
      <br />
    </div>
  )
};

export default ControlButton;
