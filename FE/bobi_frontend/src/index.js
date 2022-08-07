import React from 'react';
import ReactDOM from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter, Routes, Route } from 'react-router-dom'; // router
import './index.css';
import App from './App';
import Main from './pages/Main';
import Archive from './pages/Archive/Archive';
import Config from './pages/Config';
import Control from './pages/Control';
import Friendliness from './pages/Friendliness';
import Live from './pages/Live'
import Login from './pages/Login';
import Sensor from './pages/Sensor';
import Story from './pages/Story';
import User from './pages/User';
import reportWebVitals from './reportWebVitals';
import Layout from './layout/Layout';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<App />}></Route>
          <Route path="/main" element={<Main />}></Route>
          <Route path="/archive" element={<Archive />}></Route>
          <Route path="/config" element={<Config />}></Route>
          <Route path="/control" element={<Control />}></Route>
          <Route path="/friendliness" element={<Friendliness />}></Route>
          <Route path="/live" element={<Live />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/sensor" element={<Sensor />}></Route>
          <Route path="/story" element={<Story />}></Route>
          <Route path="/user" element={<User />}></Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
