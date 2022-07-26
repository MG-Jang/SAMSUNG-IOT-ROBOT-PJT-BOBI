import React from "react";
import styled from "styled-components";
import Menu from "./menu/Menu";

const StyledHeader = styled.header`
  background-color: #a6eae2;
`;

function Header() {
  return (
    <div>
      <StyledHeader>
        <h2>Header</h2>
        <Menu></Menu>
      </StyledHeader>
    </div>
    
  );
}

export default Header;
