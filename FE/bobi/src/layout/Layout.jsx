import React from "react";
import styled from "styled-components";
import Footer from "./footer/Footer";
import Header from "./header/Header";

// const StyledLayout = styled.layout`
// .Layout {
// }
// `
function Layout(props) {
  return (
      <div class="Layout">
        <Header />
          <main>{props.children}</main>
        <Footer />
    </div>
    
  );
}

export default Layout;
