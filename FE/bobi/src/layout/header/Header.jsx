import React from "react";
import styled from "styled-components";
import Menu from "./menu/Menu";

const StyledHeader = styled.header`
  .Header {
    background-color: #a6eae2;
    display: flex;
    position: fixed;
    left: 0;
    right: 0;
    width: 100%;
    height: 65px;
  }

  .Header-image {
    width: 50px;
    height: 50px;
    margin: 10px;
  }

  .Header-title {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
`;

function Header() {
  return (
    <StyledHeader>
      <div class="Header">
        <img src="img/bobi_dot.png" className="Header-image" alt="logo" />
        <h2 class="Header-title">BOBI</h2>
        <Menu class="Header-menu"></Menu>
        </div>
    </StyledHeader>
  );
}

export default Header;
