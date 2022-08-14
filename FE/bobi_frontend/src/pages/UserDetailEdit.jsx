import React, { useState, useEffect } from "react";
import UserForm from "../components/UserForm";

function UserDetailEdit () {

  const username = localStorage.getItem("user_name");
  const email = localStorage.getItem("email");
  const [ nickname, setNickname ] = useState(localStorage.getItem("nickname"));
  const [ youtube, setYoutube ] = useState("");
  const [ robotId, setRobotId ] = useState("");
  const [ users, setUsers ] = useState([]);

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
  
  const onNicknameChange = (event) => {
    setNickname(event.currentTarget.value);
  };

  const onYoutubeChange = (event) => {
    setYoutube(event.currentTarget.value);
  };

  const onRobotIdChange = (event) => {
    setRobotId(event.currentTarget.value);
  };

  // 위에서 찾은 id값을 바탕으로 PUT 요청을 보낸다
  const UserDetailSubmit = (event) => {
    event.preventDefault();
    fetch(`https://i7a208.p.ssafy.io/api/v1/fakeusers/${id}/`, {
      method: "PUT",
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
      window.location.href=`/config`
  };



  return (
    <>
      <br />
      <br />
      <h1 style={{textDecoration: "underline", textDecorationColor: "#a6eae2", textDecorationThickness: 5}}>회원정보수정</h1>
      <br />
      <UserForm
        nicknameValue={nickname}
        youtubeValue={youtube}
        robotIdValue={robotId}
        handleNicknameChange={onNicknameChange}
        handleYoutubeChange={onYoutubeChange}
        handleRobotIdChange={onRobotIdChange}
        handleSubmit={UserDetailSubmit}
        updateRequest={true}
      />
    </>
  )
};

export default UserDetailEdit;