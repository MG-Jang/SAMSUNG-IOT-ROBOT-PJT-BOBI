import React from 'react';
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
  background-color: #E8EDF2;
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
  font-family: 'GangwonEdu_OTFBoldA';
  }
`;

function Main() {
  return (
    <div>
      <StyledMain>
        <div className="Main">
          <header className="Main-header">
            <img src="https://i.ibb.co/PGZd2Td/bobi-dot.png" className="Main-logo" alt="logo" />
            <h1 style={{fontSize: "60px"}}className="Main-title">BoBi</h1>
          </header>
        </div>
      </StyledMain>
    </div>
  )
}

export default Main;