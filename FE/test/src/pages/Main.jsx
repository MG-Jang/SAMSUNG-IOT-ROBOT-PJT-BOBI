import React from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
// import "./Main.css"

const StyledMain = styled.main`
  .Main {
    text-align: center;
  }

  .Main-logo {
    height: 40vmin;
    pointer-events: none;
  }

  .Main-header {
    background-color: #e8edf2;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
  }

  .Main-title {
    color: #000000;
    font-family: "EF_hyunydororong";
  }
`;

function Main() {
  // 접속한 사용자의 os 구분하기 위함
  const os = navigator.userAgent.toLowerCase();
  if (
    (os.indexOf("iphone") > -1 ||
      os.indexOf("ipad") > -1 ||
      os.indexOf("ipod") > -1) &&
    localStorage.getItem("iphone_user") == undefined
  ) {
    alert("IOS 사용시 음성 수신 기능이 제한될 수 있습니다!");
    window.localStorage.setItem("iphone_user", "아이폰");
  }

  if (localStorage.getItem("user_name") === null) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <StyledMain>
        <div className="Main">
          <header className="Main-header">
            <img
              src="https://i.ibb.co/PGZd2Td/bobi-dot.png"
              className="Main-logo"
              alt="logo"
            />
            <h1 style={{ fontSize: "60px" }} className="Main-title">
              BoBi
            </h1>
          </header>
        </div>
      </StyledMain>
    </div>
  );
}

export default Main;
