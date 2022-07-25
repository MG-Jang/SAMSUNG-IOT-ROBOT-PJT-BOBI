import React from "react";
import Footer from "./footer/Footer";
import Header from "./header/Header";

function Layout(props) {
  return (
    <div>
      <Header />

      <main>{props.children}</main>

      <Footer />
    </div>
  );
}

export default Layout;
