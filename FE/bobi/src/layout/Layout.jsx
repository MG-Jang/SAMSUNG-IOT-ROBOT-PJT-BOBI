import React from "react";
import styled from "styled-components";
import Footer from "./footer/Footer";
import Header from "./header/Header";

const StyledMain = styled.main`
  min-height: calc(100vh - 40px);   // footer 하단 고정
  padding-top: 65px;    // Header과 내용 겹치지 않게 (Header의 height이 65px임 (Header.jsx))
`

function Layout(props) {
  return (
    <div className="layout">
      <Header />
        <StyledMain>{props.children}</ StyledMain>
      <Footer />
    </div>
  );
}

export default Layout;
