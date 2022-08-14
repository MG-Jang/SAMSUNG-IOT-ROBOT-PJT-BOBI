import React, { useState } from "react";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import VoiceModal from "../components/modal/VoiceModal";

function Config() {
  
  const [ logoutModalOpen, setLogoutModalOpen ] = useState(false);
  const [ exitModalOpen, setExitModalOpen ] = useState(false);
  const [ users, setUsers ] = useState([]);
  const email = localStorage.getItem("email");

  useEffect(() => {
    fetch(`https://i7a208.p.ssafy.io/api/v1/fakeusers/`)
    .then(res => {
      return res.json();
    })
    .then(data => {
      setUsers(data);
    })
  })

  // useEffect로 유저 전체 데이터를 가져와서 email 정보들 리스트를 만든 뒤 현재 로그인된 email과 일치하는 유저의 인덱스로 id값을 찾는다.
  const emails = users.map(user => user.email);
  const ids = users.map(user => user.id);
  const index = emails.indexOf(email);
  const id = ids[index];

  const openLogoutModal = () => {
    setLogoutModalOpen(true);
  };

  const openExitModal = () => {
    setExitModalOpen(true);
  };

  const closeLogoutModal = () => {
    setLogoutModalOpen(false);
  };

  const closeExitModal = () => {
    setExitModalOpen(false);
  };

  const navigate = useNavigate();

  const logoutSubmit = () => {
    window.localStorage.clear();
    navigate(`/`)
  };

  const exitSubmit = () => {
    fetch(`https://i7a208.p.ssafy.io/api/v1/fakeusers/${id}/`, {
      method: "DELETE"})
      .then(res => {
        return res.json();
      })
      .then(data=>console.log(data))
      .catch(error=>console.log(error));
    window.localStorage.clear();
    navigate(`/`)
  };


  return (
    <div>
    <br />
    <br />
    <h1 style={{textDecoration: "underline", textDecorationColor: "#a6eae2", textDecorationThickness: 5}}>환경설정</h1>
    <br />
    <br />
    <h4><NavLink to="/userDetailEdit" style={{textDecoration: "none", color: "#000000"}}>회원정보수정</NavLink></h4>
    <br />
    <br />
    <h4 onClick={openLogoutModal}>로그아웃</h4>
    <VoiceModal open={logoutModalOpen} close={closeLogoutModal} header="로그아웃" submit={logoutSubmit} submitMessage="확인" cancel={closeLogoutModal}>
      <p>&nbsp;&nbsp;로그아웃하시겠습니까?</p>
    </VoiceModal>
    <br />
    <br />
    <h4 onClick={openExitModal}>회원탈퇴</h4>
    <VoiceModal open={exitModalOpen} close={closeExitModal} header="회원탈퇴" submit={exitSubmit} submitMessage="확인" cancel={closeExitModal}>
      <p>&nbsp;&nbsp;탈퇴하시겠습니까?</p>
    </VoiceModal>
    </div>
  )
};

export default Config;
