import React, { useEffect, useState } from "react";
import Graph from '../components/Graph';
import Graph1 from '../components/Graph1';

function Sensor() {
  const [ sensor, setSensor ] = useState([]);

  useEffect(() => {
    fetch("https://i7a208.p.ssafy.io/api/v1/sensors/")
      .then(res => {
        return res.json();
    })
      .then((data) => {
        // console.log(data)
        const last = data.length - 1    // 가장 최신 데이터 출력
        const lastdata = data[last]
        setSensor(lastdata);
        console.log(lastdata)
    });
  }, []);

    return (
        <div>
          <br />
          <h1 style={{textDecoration: "underline", textDecorationColor: "#a6eae2", textDecorationThickness: 5}}>센서 데이터</h1>
          <br />
          
          <div>
            <h3 style={{ color: "#696969" }}>감지 시각: {sensor["datetime"]}</h3>
            <br />
          </div>

          {/* 현재 온도*/}
          <div style={{backgroundColor: "#ECEBEB", paddingBottom: "15px", marginRight: "5rem", marginLeft: "5rem", height: "90px"}}>
            <br />
            <img style={{marginRight: "20px", width: "7vw" }} src="https://images.emojiterra.com/google/android-pie/512px/1f321.png" alt="temperature" />
          <span style={{fontSize: "4vw"}}>현재 온도: {sensor["temperature"]} °C</span>
          <br />
          
          </div>
          <Graph />
          

          <br />
          <br />

          {/* 현재 습도*/}
          <div style={{backgroundColor: "#ECEBEB", paddingTop:"5px", paddingBottom: "15px", marginRight: "5rem", marginLeft: "5rem", height: "90px"}}>
            <br />
            <img style={{marginRight: "20px", width: "3vw", marginBottom: "40px"}} src="https://www.clipartmax.com/png/full/237-2372103_humidity-free-icon-humidity.png" alt="temperature" />
          <span style={{fontSize: "4vw"}}>현재 습도: {sensor["humidity"]} °C</span>
          <br />

          
          </div>
          <Graph1 />
          
          
          <br />
          <br />

          <div style={{backgroundColor: "#ECEBEB", paddingTop:"5px", paddingBottom: "15px", marginRight: "5rem", marginLeft: "5rem", height: "90px"}}>
            <br />
          <img style={{marginRight: "20px", width: "7vw", marginBottom: "5vw"}} src="https://icon-library.com/images/warning-icon-png/warning-icon-png-19.jpg" alt="temperature" />
          {
            sensor["gas"] === 0
            ? <span><span>현재 가스 상태: </span><span style={{color: "red"}}>위험해요!</span></span>
            : <span><span style={{ fontSize: "4vw", marginBottom: "4vw" }}>현재 가스 상태: </span><span style={{color: "blue", fontSize: "4vw"}}>안전해요!</span></span>
          }
          <br />
          </div>
          
          <div style={{ marginLeft: "5rem", marginRight: "5rem", marginBottom: "5rem" }}>
            {/* <Graph /> */}
          </div>
          
        </div>
    )
};

export default Sensor;