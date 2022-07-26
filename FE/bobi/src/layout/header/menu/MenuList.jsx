import React from "react";

const List = styled.ul`
  display: ${(p) => (p.expanded ? "block" : "none")};
  margin: 0;
  padding: 0;
  padding-left: 20px;
  list-style: none;
`;

function MenuList({ children, expanded = true }) {
  return <List expanded={expanded}>{children}</List>;
}
export default MenuList;