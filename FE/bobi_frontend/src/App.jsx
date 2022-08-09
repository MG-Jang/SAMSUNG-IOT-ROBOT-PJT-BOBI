import React from "react";
import { Link, Navigate } from 'react-router-dom';
import './App.css';

function App() {
  if (localStorage.getItem("user_name") === null) {
    return (
      <Navigate to="/login" />
    )
  };

  return (
    <div>
      <h1 >[Main Page]</h1>
      <Link to="/main">start page</Link>
    </div>    
  );
}

export default App;

