import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
  .Footer {
    background-color: #DCDCDC;
    display: flex;
    height: 40px;
    justify-content: center;
    text-align: center;
  }

  .Footer-text {
    margin-bottom: 0;
  }
`;

function Footer() {
  return (
    <StyledFooter>
      <div className="Footer">
        <h3 className="Footer-text">Footer</h3>
      </div>
    </StyledFooter>
  );
}

export default Footer;