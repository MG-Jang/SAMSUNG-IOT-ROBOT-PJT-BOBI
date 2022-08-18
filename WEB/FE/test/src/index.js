import React from 'react';
import ReactDOM from 'react-dom/client';

import * as serviceWorkerRegistration from './serviceWorkerRegistration'; // pwa

import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter, Routes, Route } from 'react-router-dom'; // router
import './index.css';
import App from './App';
import Main from './pages/Main';
import ArchiveImage from './pages/archive/ArchiveImage';
import ArchiveImageDetail from './pages/archive/ArchiveImageDetail';
import ArchiveImageUpdate from './pages/archive/ArchiveImageUpdate';
import ArchiveVideo from './pages/archive/ArchiveVideo';
import ArchiveVideoWrite from './pages/archive/ArchiveVideoWrite';
import ArchiveVideoDetail from './pages/archive/ArchiveVideoDetail';
import ArchiveVideoUpdate from './pages/archive/ArchiveVideoUpdate';
import Config from './pages/Config';
import Control from './pages/Control';
import Friendliness from './pages/Friendliness';
import Intro from './pages/Intro'
import Live from './pages/Live'
import Login from './pages/Login';
import Sensor from './pages/Sensor';
import Story from './pages/Story';
import User from './pages/User';
import UserDetail from './pages/UserDetail';
import UserDetailEdit from './pages/UserDetailEdit';
import Voice from './pages/Voice';
import reportWebVitals from './reportWebVitals';
import Layout from './layout/Layout';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/app" element={<App />}></Route>
          <Route path="/" element={<Main />}></Route>
          <Route path="/archive-image" element={<ArchiveImage />}></Route>
          <Route path="/archive-image/:id" element={<ArchiveImageDetail />}></Route>
          <Route path="/archive-image/:id/update" element={<ArchiveImageUpdate />}></Route>
          <Route path="/archive-video" element={<ArchiveVideo />}></Route>
          <Route path="/archive-video/write" element={<ArchiveVideoWrite />}></Route>
          <Route path="/archive-video/:id" element={<ArchiveVideoDetail />}></Route>
          <Route path="/archive-video/:id/update" element={<ArchiveVideoUpdate />}></Route>
          <Route path="/config" element={<Config />}></Route>
          <Route path="/control" element={<Control />}></Route>
          <Route path="/friendliness" element={<Friendliness />}></Route>
          <Route path="/intro" element={<Intro />}></Route>
          <Route path="/live" element={<Live />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/sensor" element={<Sensor />}></Route>
          <Route path="/story" element={<Story />}></Route>
          <Route path="/user" element={<User />}></Route>
          <Route path="/user-detail" element={<UserDetail />}></Route>
          <Route path="/user-detail-edit" element={<UserDetailEdit />}></Route>
          <Route path="/voice" element={<Voice />}></Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  </React.StrictMode>
);

serviceWorkerRegistration.register(); // pwa 설정

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
