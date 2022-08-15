import React, { useEffect, useState } from "react";
import styled from "styled-components";

const StyledBase = styled.div`
    height: 26px;
    border: 3px solid;
    margin-right: 15%;
    margin-left: 15%;
    justify-content: center;
`

const StyledRange = styled.div`
    width: ${({ width }) => `${width}%`};
    height: 20px;
    background: linear-gradient(to right, #FFACFC, #B76CFD);
`
function Friendliness() {
    const [ exp, setExp ] = useState([]);

    useEffect(() => {
        fetch("https://i7a208.p.ssafy.io/api/v1/robots/")
        .then(res => {
            return res.json();
        })
        .then((data) => {
            // console.log(data)
            // console.log(data.length)
            const last = data.length - 1    // 가장 최신 데이터 출력
            const lastdata = data[last]
            console.log(lastdata)
            setExp(lastdata["exp"]);
        });
    }, []);

    const ratio = parseInt(exp % 100);
    const left = 100 - ratio

    return (
        <div>
            <br />
            <br />
            <h1 style={{textDecoration: "underline", textDecorationColor: "#a6eae2", textDecorationThickness: 5}}>보비와 친해져요</h1>
            <br />
            <br />
            <img style={{ width: "70%" }} src="https://i.ibb.co/Fntm4YB/image.jpg" alt="bobi_blue" />

            <br />
            <br />
            <div style={{ justifyContent: "center", width: "60%", height: "10%", marginLeft: "20%", marginTop: "5%", marginBottom: "5%", padding: "1%", backgroundColor: "#FFF380"}}>
            <span style={{ fontWeight: "bold", fontSize: "20px" }}>현재 친밀도</span>
            <span style={{ fontWeight: "bold", fontSize: "20px", marginLeft: "2%", textShadow: "-1px 0 #FFC0CB, 0 1px #FFC0CB, 1px 0 #FFC0CB, 0 -1px #FFC0CB"}}>{exp}</span>
      </div>

            <StyledBase>
                <StyledRange width={ratio} />
            </StyledBase>
            <br />
            <div style={{ marginBottom: "3%"}}>
                <span>다음 레벨까지 </span>
                <span style={{ textShadow: "-1px 0 #7EC850, 0 1px #7EC850, 1px 0 #7EC850, 0 -1px #7EC850" }}>{left}</span>
                <span> pt</span>
            </div>
            <p style={{ marginBottom: "0"}}>친밀도가 올라가면 보비가 새로운 이야기를 들려주고,</p>
            <p>더 멋진 행동도 보여줘요!</p>
        </div>
    )
};

export default Friendliness;