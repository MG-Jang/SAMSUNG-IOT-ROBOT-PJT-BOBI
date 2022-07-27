import React from "react";
// import Menu from "./Menu"

import Dropdown from "../../components/Dropdown";
// import { DropdownItem } from 'reactstrap';
import styled from "styled-components";
import ArchiveMenu from "./ArchiveMenu"
import { NavLink } from "react-router-dom"


const StyledMenu = styled.menu`
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
    animation: slide-fade-in-dropdown-animation .4s ease;
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

  .button {
    font-size: 5rem;
    margin-right: 3rem;
  }
`;

// function isActive(path) {
//   return window.location.pathname.startsWith(path);
// }

function HeaderMenu (props) {
  const [dropdownVisibility, setDropdownVisibility ] = React.useState(false);

  return (
    <div className='Header-menu'>
      <StyledMenu>
        <button onClick={e => setDropdownVisibility(!dropdownVisibility)}>
          {
            dropdownVisibility
            ? 'Close'
            : 'Open'
          }
        </button>
        <Dropdown visibility={dropdownVisibility}>
          <ul>
            <li><NavLink to="/">실시간 영상</NavLink></li>
            <li><NavLink to="/friendliness">친밀도</NavLink></li>
            <li><ArchiveMenu /></li>
            <li><NavLink to="/story">스토리</NavLink></li>
            <li><NavLink to="/control">로봇 조작</NavLink></li>
            <li><NavLink to="/sensor">센서</NavLink></li>
            <li><NavLink to="/config">환경설정</NavLink></li>
            <li><NavLink to="/user">회원정보수정</NavLink></li>
          </ul>
        </Dropdown>
      </StyledMenu>
    </div>
  )
};

export default HeaderMenu;