import React from "react";
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

function Live() {
    return (
        <div>
          <StyledMain>
            <div className="div">
              <br />
              <h1>Youtube Live</h1>
              <br />
              <iframe width="560" height="315" src="https://www.youtube.com/embed/live_stream?channel=UC0Hu-_pAlzKFhiZPqDAUbIw" frameBorder="0" allowFullScreen></iframe>
            </div>
          </StyledMain>
        </div>
    )
};

export default Live;