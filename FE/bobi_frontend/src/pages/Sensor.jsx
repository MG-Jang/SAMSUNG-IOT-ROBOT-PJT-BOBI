import React, { useEffect, useState } from "react";
// import Graph from '../components/Graph';

function Sensor() {
  const [ sensor, setSensor ] = useState([]);

  useEffect(() => {
    fetch("http://i7a208.p.ssafy.io/api/v1/sensors/")
      .then(res => {
        return res.json();
    })
      .then((data) => {
        console.log(data)
        const last = data.length - 1    // 가장 최신 데이터 출력
        const lastdata = data[last]
        setSensor(lastdata);
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

          <div style={{backgroundColor: "#ECEBEB", paddingBottom: "15px", marginRight: "5rem", marginLeft: "5rem", height: "90px"}}>
            <br />
          <img style={{marginRight: "20px", width: "30px", height: "60px"}} src="https://pic.onlinewebfonts.com/svg/img_186736.png" alt="temperature" />
          <span style={{fontSize: "20pt"}}>현재 온도: {sensor["temperature"]} °C</span>
          <br />
          </div>
          <br />
          <br />

          <div style={{backgroundColor: "#ECEBEB", paddingTop:"5px", paddingBottom: "15px", marginRight: "5rem", marginLeft: "5rem", height: "90px"}}>
            <br />
          <img style={{marginRight: "20px", width: "30px", marginBottom: "10px"}} src="https://cdn1.iconfinder.com/data/icons/ui-set-4-1/512/water_drop_humidity_meter_level_resistant_measurement_waterproof-512.png" alt="temperature" />
          <span style={{fontSize: "20pt"}}>현재 습도: {sensor["humidity"]} °C</span>
          <br />
          </div>
          
          <br />
          <br />
          {
            sensor["gas"] === 0
            ? <div><span>현재 가스 상태: </span><span style={{color: "blue"}}>안전해요!</span></div>
            : <div><span>현재 가스 상태: </span><span style={{color: "red"}}>위험해요!</span></div>
          }
          <div style={{ marginLeft: "5rem", marginRight: "5rem", marginBottom: "5rem" }}>
            {/* <Graph /> */}
          </div>
          
        </div>
    )
};

export default Sensor;