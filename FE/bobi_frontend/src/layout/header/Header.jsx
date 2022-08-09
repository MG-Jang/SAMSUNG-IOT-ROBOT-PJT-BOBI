import React from "react";
import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import { Link } from "react-router-dom";

const StyledHeader = styled.header`
  .Header {
    background-color: #a6eae2;
    display: flex;
    position: fixed;
    left: 0;
    right: 0;
    // width: 100%;
    height: 4rem;
    justify-content: space-between;
  }
  
  .Header-link {
    text-decoration: none;
    color: black;
    display: flex;
    align-items: center;
  }

  .Header-image {
    width: 3rem;
    height: 3rem;
    margin-left: 1rem;
    margin-right: 1rem;
  }

  .Header-title {
    font-size: 2rem;
  }
`;

function Header() {
  return (
    <StyledHeader>
      <div className="Header">
        <Link className="Header-link" to="/">
          <img src="img/bobi_dot.png" className="Header-image" alt="logo" />
          <h2 className="Header-title">BOBI</h2>
        </Link>
        <HeaderMenu className="Header-menu"></HeaderMenu>
      </div>
    </StyledHeader>
  );
}

export default Header;
