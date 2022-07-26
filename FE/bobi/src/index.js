import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter, Routes, Route } from 'react-router-dom'; // router
import './index.css';
import App from './App';
import Main from './pages/Main';
import Archive from './pages/Archive/Archive';
import Config from './pages/Config';
import Control from './pages/Control';
import Friendliness from './pages/Friendliness';
import Login from './pages/Login';
import Sensor from './pages/Sensor';
import Story from './pages/Story';
import User from './pages/User';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/main" element={<Main />}></Route>
        <Route path="/archive" element={<Archive />}></Route>
        <Route path="/config" element={<Config />}></Route>
        <Route path="/control" element={<Control />}></Route>
        <Route path="/friendliness" element={<Friendliness />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/sensor" element={<Sensor />}></Route>
        <Route path="/story" element={<Story />}></Route>
        <Route path="/user" element={<User />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
