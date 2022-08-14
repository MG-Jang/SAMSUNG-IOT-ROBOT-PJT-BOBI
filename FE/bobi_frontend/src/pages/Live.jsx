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
              <h1 style={{textDecoration: "underline", textDecorationColor: "#a6eae2", textDecorationThickness: 5}}>실시간 영상</h1>
              <br />
              {/* BoBi 계정의 가장 최신 스트리밍 영상 */}
              <iframe title="Live" width="60%" src="https://www.youtube.com/embed/live_stream?channel=UC0Hu-_pAlzKFhiZPqDAUbIw" frameBorder="0" allowFullScreen></iframe>
            </div>
          </StyledMain>
        </div>
    )
};

export default Live;