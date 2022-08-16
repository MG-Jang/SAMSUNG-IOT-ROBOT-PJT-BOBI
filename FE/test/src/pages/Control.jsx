import React from "react";
import ControlButton from "../components/ControlButton";
import ControlButtonDummy from "../components/ControlButtonDummy";
import styled from "styled-components";

const StyledMain = styled.main`
.div {
  text-align: center;
  justify-content: center;
  align-items: center;
}
.h1 {
  text-align: center;
}
  }
`;

function Control() {
  const email = localStorage.getItem("email");

  return (
    <div>
      <br />
      <br />
      <h1
        style={{
          textDecoration: "underline",
          textDecorationColor: "#a6eae2",
          textDecorationThickness: 5,
        }}
      >
        로봇 조작
      </h1>
      <br />
      <StyledMain>
        <div className="div">
          <iframe
            title="Live"
            width="60%"
            src="https://www.youtube.com/embed/live_stream?channel=UC0Hu-_pAlzKFhiZPqDAUbIw"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </StyledMain>
      <br />
      {email === "carerobotbobi@gmail.com" ? (
        <ControlButton />
      ) : (
        <ControlButtonDummy />
      )}
    </div>
  );
}

export default Control;
