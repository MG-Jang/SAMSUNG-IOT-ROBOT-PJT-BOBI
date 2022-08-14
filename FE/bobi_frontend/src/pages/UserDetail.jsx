import React, { useEffect, useState } from "react";
import UserForm from "../components/UserForm";
import { Navigate } from 'react-router-dom';

function UserDetail() {
  const username = localStorage.getItem("user_name")
  const email = localStorage.getItem("email")
  const [ nickname, setNickname ] = useState("")
  const [ youtube, setYoutube ] = useState("")
  const [ robotId, setRobotId ] = useState("")
  const [ users, setUsers ] = useState([])


  useEffect(() => {
    fetch("https://i7a208.p.ssafy.io/api/v1/fakeusers")
    .then(res => {
      return res.json();
    })
    .then(data => {
      setUsers(data);
    })
  })

  // 서버에 저장된 user들의 email들을 모아서 서버에 해당 email이 있으면 이미 회원가입과정을 완료한 것이므로 메인으로 돌아감
  const emails = users.map(user => user.email)
  for (var i in emails) {
    if (localStorage.getItem("email") === emails[i]) {
      return (
        <Navigate to="/" />
      )
    };
  };

  const onNicknameChange = (event) => {
    setNickname(event.currentTarget.value);
  };

  const onYoutubeChange = (event) => {
    setYoutube(event.currentTarget.value);
  };

  const onRobotIdChange = (event) => {
    setRobotId(event.currentTarget.value);
  };

  const UserDetailSubmit = (event) => {
    event.preventDefault();
    fetch("https://i7a208.p.ssafy.io/api/v1/fakeusers/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body : JSON.stringify({
        username: username,
        email: email,
        youtube_id: youtube,
        nickname: nickname,
        robot_id: robotId
      }),
      })
      .then((res) => res.json())
      .catch((err) => console.log("error : ", err))
      window.localStorage.setItem("nickname", nickname);
      console.log(youtube)
      window.location.reload()
  };

  return (
    <>
      <br />
      <h1 style={{textDecoration: "underline", textDecorationColor: "#a6eae2", textDecorationThickness: 5}}>사진 아카이브 작성</h1>
      <br />
      <UserForm 
        nicknameValue={nickname}
        youtubeValue={youtube}
        robotIdValue={robotId}
        handleNicknameChange={onNicknameChange}
        handleYoutubeChange={onYoutubeChange}
        handleRobotIdChange={onRobotIdChange}
        handleSubmit={UserDetailSubmit}
        updateRequest={false}
      />
    </>
  )
};

export default UserDetail;