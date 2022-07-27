import React from "react";
// import Dropdown from "../../components/Dropdown";
// import styled from "styled-components";

// const StyledMenu = styled.menu`
//   @keyframes slide-fade-in-dropdown-animation {
//     0% {
//       transform: translateY(-100%);
//     }
  
//     100% {
//       transform: translateY(0);
//     }
//   }
  
//   .slide-fade-in-dropdown {
//     overflow: hidden;
//   }
  
//   .slide-fade-in-dropdown > ul {
//     animation: slide-fade-in-dropdown-animation .4s ease;
//   }
  
//   @keyframes slide-fade-out-dropdown-animation {
//     0% {
//       transform: translateY(0);
//     }
  
//     100% {
//       transform: translateY(-100%);
//     }
//   }
  
//   .slide-fade-out-dropdown {
//     overflow: hidden;
//   }
  
//   .slide-fade-out-dropdown > ul {
//     animation: slide-fade-out-dropdown-animation 0.4s ease;
//     animation-fill-mode: forwards;
//   }
  
//   .components-dropdown > ul {
//     position: relative;
//     top: 5px;
//     margin-top: 0;
//     margin-bottom: 5px;
//     padding-left: 0;
//     list-style: none;
//   }
  
// `;

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
    <div className='ArchiveMenu'>
      <button onClick={e => setDropdownVisibility(!dropdownVisibility)}>
        {
          dropdownVisibility
          ? '▼ 아카이브'
          : '▶ 아카이브'
        }
      </button>
      <ArchiveDropdown visibility={dropdownVisibility}>
        <ul>
          <li>사진</li>
          <li>영상</li>
        </ul>
      </ArchiveDropdown>
    </div>
  )
};

export default ArchiveMenu