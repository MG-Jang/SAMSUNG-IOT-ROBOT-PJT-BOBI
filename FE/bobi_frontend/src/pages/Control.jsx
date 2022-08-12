import React, { useEffect, useState } from "react";
import mqtt from 'mqtt/dist/mqtt';

function Control() {
  // userId 불러오기
  const [ userId, setUserId ] = useState([]);

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
  };

  const stopForward = () => {
    const topic = `${userId}/move/forward`
    const payload = 'off'
    client.publish(topic, payload, error => {
      if (error) {
        console.log('Publish error: ', error);
      }
      console.log('stopForward')
    });
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
  }

  const stopBack = () => {
    const topic = `${userId}/move/backward`
    const payload = 'off'
    client.publish(topic, payload, error => {
      if (error) {
        console.log('Publish error: ', error);
      }
      console.log('stopBack')
    });
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
  }

  const stopRight = () => {
    const topic = `${userId}/move/right`
    const payload = 'off'
    client.publish(topic, payload, error => {
      if (error) {
        console.log('Publish error: ', error);
      }
      console.log('stopRight')
    });
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
  }

  return (
    <div>
      <br />
        <h1 style={{textDecoration: "underline", textDecorationColor: "#a6eae2", textDecorationThickness: 5}}>로봇 조작</h1>
      <br />
        {/* <p>userId: {userId}</p> */}
      <br />
        <img style={{ height: "60px" }} src="https://cdn-icons-png.flaticon.com/512/992/992703.png" onMouseDown={() => moveForward()} onMouseUp={() => stopForward()} alt="buttonForward"/>
      <br />
      <div>
        <img style={{ height: "60px", marginRight: "5rem" }}src="https://cdn-icons-png.flaticon.com/512/318/318276.png" onMouseDown={() => moveLeft()} onMouseUp={() => stopLeft()} alt="buttonForward"/>
        <img style={{ height: "60px" }} src="https://cdn-icons-png.flaticon.com/512/318/318275.png" onMouseDown={() => moveRight()} onMouseUp={() => stopRight()} alt="buttonForward"/>
      </div>
      <img style={{ height: "60px" }}src="https://cdn-icons-png.flaticon.com/512/318/318278.png" onMouseDown={() => moveBack()} onMouseUp={() => stopBack()} alt="buttonForward"/>

    </div>
  )
};

export default Control;