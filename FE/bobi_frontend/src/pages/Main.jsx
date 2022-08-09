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
  background-color: #A6EAE2;
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
  }
`;

function Main() {
  return (
    <div>
      <StyledMain>
        <div className="Main">
          <header className="Main-header">
            <img src="img/bobi_dot.png" className="Main-logo" alt="logo" />
            <h1 className="Main-title">BOBI</h1>
          </header>
        </div>
      </StyledMain>
    </div>
  )
}

export default Main;