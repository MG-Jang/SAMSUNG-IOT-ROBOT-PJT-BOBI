---
last modified: 2022-08-02
---

# MQTT in Node.js

- 참조에 있는 페이지를 따라 node.js에서 사용할 수 있도록 함

## 사용법

> node mqtt_js_test.js
> (package.json에 script로 지정해도 됨-아래 페이지 참조)

## 코드 설명

```js
const mqtt = require("mqtt");

// ec2 서버에서 동작하고 있는 mqtt broker에 연결할 option
const host = "i7a208.p.ssafy.io";
const port = "1883";
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;

const connectUrl = `mqtt://${host}:${port}`;

// 실제로연결 진행
const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  reconnectPeriod: 1000,
});

/*
 * subscribe, publish할 주제
 *
 * 실제로는 우리 프로젝트에 있는 대로
 * [userid]/move/forward,.... 형식으로 진행해야 하나 test용 주제로 진행함
 */
const topic = "testuser/hello";

/*
 * connect 됐을 때 불리는 callback 함수
 *
 * connect 됐다는 문구 출력
 * 아까 지정한 주제 구독 & 구독했다는 log 출력
 * connect는 처음 연결을 진행할 때만 사용되므로
 * 첫 연결에만 사용되는 함수라고 보면 됨(초기세팅)
 */
client.on("connect", () => {
  console.log("Connected");
  client.subscribe([topic], () => {
    console.log(`Subscribe to topic '${topic}'`);
  });
});

/*
 * mssg를 받았을 때 불리는 callback 함수
 *
 * mssg 출력
 * 실제로 메시지를 받을 때마다 불리는 함수로
 * 개발 시에는 로봇으로부터 메시지가 들어오면
 * 처리할 부분을 이 함수에 작성하면 됨
 */
client.on("message", (topic, payload) => {
  console.log("Received Message:", topic, payload.toString());
});

/*
 * 연결 됐을 때 publish하는 함수
 *
 * 메시지를 로봇에게 보내는 부분으로
 * 이 test 코드에서는 nodejs mqtt test 라는 메시지를 연결 됐을 때 보냄
 * 실제 개발에서는 on connect에 넣지 말고
 * '앞으로' 버튼이 눌리면 publish를 하는 형식으로 개발하면 됌
 */
client.on("connect", () => {
  client.publish(
    topic,
    "nodejs mqtt test",
    { qos: 0, retain: false },
    (error) => {
      if (error) {
        console.error(error);
      }
    }
  );
});
```

## 결과
- ec2와 통신이 잘 된다

## reference

- [How to use MQTT in Node.js](https://www.emqx.com/en/blog/how-to-use-mqtt-in-nodejs)
