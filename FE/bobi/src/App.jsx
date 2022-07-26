import React from "react";
import Layout from "./layout/Layout";
import { Link } from 'react-router-dom';

function App() {
  return (
    <Layout>
      <div>
        <h1>[Main Page]</h1>
        <Link to="/main">start page</Link>
      </div>    
    </Layout>
  );
}

export default App;
