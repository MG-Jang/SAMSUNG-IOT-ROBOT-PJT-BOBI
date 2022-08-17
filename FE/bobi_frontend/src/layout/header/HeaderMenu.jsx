import React from "react";
import Dropdown from "../../components/Dropdown";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faBars } from "@fortawesome/free-solid-svg-icons";

const StyledMenu = styled.menu`
  width: 12rem;
  font-family: "GangwonEdu_OTFBoldA";
  z-index: 20;

  @keyframes slide-fade-in-dropdown-animation {
    0% {
      transform: translateY(-100%);
    }

    100% {
      transform: translateY(0);
    }
  }

  .slide-fade-in-dropdown {
    overflow: hidden;
  }

  .slide-fade-in-dropdown > ul {
    animation: slide-fade-in-dropdown-animation 0.4s ease;
  }

  @keyframes slide-fade-out-dropdown-animation {
    0% {
      transform: translateY(0);
    }

    100% {
      transform: translateY(-100%);
    }
  }

  .slide-fade-out-dropdown {
    overflow: hidden;
  }

  .slide-fade-out-dropdown > ul {
    animation: slide-fade-out-dropdown-animation 0.4s ease;
    animation-fill-mode: forwards;
  }

  .components-dropdown > ul {
    position: relative;
    top: 5px;
    margin-top: 0;
    margin-bottom: 0.6rem;
    padding-top: 0.2rem;
    padding-left: 1.2rem;
    padding-right: 1.2rem;
    padding-bottom: 1.2rem;
    list-style: none;
    background-color: #a6eae2;
  }

  .components-dropdown > ul > li {
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
  }

  .components-dropdown > ul > li > a {
    text-decoration: none;
    color: #000000;
  }

  .components-dropdown > ul > li > a.active {
    color: #ffffff;
  }

  .Header-icon {
    margin-left: 6.5rem;
    margin-bottom: 0;
  }
`;

// function isActive(path) {
//   return window.location.pathname.startsWith(path);
// }

function HeaderMenu(props) {
  const [dropdownVisibility, setDropdownVisibility] = React.useState(false);

  return (
    <div className="Header-menu" style={{zIndex: 20, position:"relative"}}>
      <StyledMenu>
        <p
          className="Header-icon"
          onClick={(e) => setDropdownVisibility(!dropdownVisibility)}
        >
          {dropdownVisibility ? (
            <FontAwesomeIcon icon={faX} size="2x" />
          ) : (
            <FontAwesomeIcon icon={faBars} size="2x" />
          )}
        </p>
        <Dropdown visibility={dropdownVisibility} style={{zIndex: 999}}>
          <ul>
            <li>
              <NavLink to="/intro">BoBi 🚀</NavLink>
            </li>
            <li>
              <NavLink to="/live">보비의 시선</NavLink>
            </li>
            <li>
              <NavLink to="/friendliness">보비와 친해져요</NavLink>
            </li>
            <li>
              <NavLink to="/archive-video">기억할 순간들</NavLink>
            </li>
            <li>
              <NavLink to="/story">숨겨진 이야기</NavLink>
            </li>
            <li>
              <NavLink to="/control">보비 움직이기</NavLink>
            </li>
            <li>
              <NavLink to="/sensor">지금 우리집은?</NavLink>
            </li>
            <li>
              <NavLink to="/voice">보비와 소통하기</NavLink>
            </li>
            <li>
              <NavLink to="/user">회원정보</NavLink>
            </li>
            <li>
              <NavLink to="/config">환경설정</NavLink>
            </li>
          </ul>
        </Dropdown>
      </StyledMenu>
    </div>
  );
}

export default HeaderMenu;
