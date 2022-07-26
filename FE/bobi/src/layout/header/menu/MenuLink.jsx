import React from "react";

function isCurrent(to) {
  return window.location.pathname.startsWith(to);
}

function MenuLink({ children, to, active = false }) {
  return (
    <Link
      href={to}
      active={active}
      aria-current={isCurrent(to) ? "page" : null}
    >
      {children}
    </Link>
  );
}
  
export default MenuLink;