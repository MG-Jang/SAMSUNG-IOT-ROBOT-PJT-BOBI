import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
  .Footer {
    background-color: #000000;
    color: white;
    display: flex;
    height: 40px;
    justify-content: center;
    text-align: center;
  }

  .Footer-text {
    margin-top: 0.5rem;
    margin-bottom: 0;
    font-size: 17px;
  }
`;

function Footer() {
  return (
    <StyledFooter>
      <div className="Footer">
        <h3 className="Footer-text">2022 SSAFY PJT A208</h3>
      </div>
    </StyledFooter>
  );
}

export default Footer;