import React from "react";
import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";

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

  .Header-link {
    text-decoration: none;
    color: black;
    margin-top: 15px;
    margin-bottom: 10px;
  }

  .Header-title {
    font-size: 28px;
  }

  .Header-menu {
    
  }
`;

function Header() {
  return (
    <StyledHeader>
      <div className="Header">
        <img src="img/bobi_dot.png" className="Header-image" alt="logo" />
        <a className="Header-link" href="/"><h2 className="Header-title">BOBI</h2></a>
        <HeaderMenu className="Header-menu"></HeaderMenu>
        </div>
    </StyledHeader>
  );
}

export default Header;
