import React from 'react';
import Dropdown from './Dropdown';
import styled from "styled-components";

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
    margin-bottom: 5px;
    padding-left: 0;
    list-style: none;
  }
  
`;

function Menu (props) {
  const [dropdownVisibility, setDropdownVisibility] = React.useState(false);

  return (
    <div className='Menu'>
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
            <li>
              <a href="/">실시간 영상</a>
            </li>
            <li>
              <a href="/friendliness">친밀도</a>
            </li>
            <li>
              <a href="/archive">아카이브</a>
            </li>
            <li>
              <a href="/story">스토리</a>
            </li>
          </ul>
        </Dropdown>
      </StyledMenu>
    </div>
  )
};

export default Menu;