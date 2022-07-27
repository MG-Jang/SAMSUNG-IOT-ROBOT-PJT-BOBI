import React from "react";
import styled from "styled-components";
// import { NavLink } from "react-router-dom"

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
`;

function ArchiveDropdown (props) {
  return (
    <article>
      { props.visibility && props.children }
    </article>
  )
};

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
        <ArchiveDropdown visibility={dropdownVisibility}>
          <ul>
            <li>사진</li>
            <li>영상</li>
          </ul>
        </ArchiveDropdown>
      </div>
    </StyledArchive>
  )
};

export default ArchiveMenu