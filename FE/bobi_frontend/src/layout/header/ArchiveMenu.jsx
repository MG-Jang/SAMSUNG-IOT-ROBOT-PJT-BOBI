import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom"
import ArchiveDropdown from "../../components/ArchiveDropdown";

const StyledArchive = styled.menu`

  margin-top: 0;
  margin-bottom: 0;
  padding: 0;

  .Archive-menu {
    margin-top: 0;
    margin-bottom: 0;
  }

  .Archive-menu > p {
    margin-top: 0;
    margin-bottom: 0;
  }

  .Archive-menu > article > ul > li > a {
    text-decoration: none; 
    color: #000000;
  }

  .Archive-menu > article > ul > li > a.active {
    color: #ffffff;
  }

`;


function ArchiveMenu (props) {
  const [dropdownVisibility, setDropdownVisibility ] = React.useState(false);
  
  return (
    <StyledArchive>
      <div className='Archive-menu'>
        <p onClick={e => setDropdownVisibility(!dropdownVisibility)}>
          {
            dropdownVisibility
            ? '▼ 아카이브'
            : '▶ 아카이브'
          }
        </p>
        <ArchiveDropdown visibility={dropdownVisibility} className="Archive-dropdown">
          <ul>
            <li><NavLink to="/archive-image">사진</NavLink></li>
            <li><NavLink to="/archive-video">영상</NavLink></li>
          </ul>
        </ArchiveDropdown>
      </div>
    </StyledArchive>
  )
};

export default ArchiveMenu
