import React, { useEffect } from "react";
import { useState } from "react";


function User () {

  const [ users, setUsers ] = useState([]);
  const [ nickname, setNickname ] = useState("");
  const [ youtubeId, setYoutubeId ] = useState("");
  const [ robotId, setRobotId ] = useState("");
  const username = localStorage.getItem("user_name");
  const email = localStorage.getItem("email");

  useEffect(() => {
    fetch("https://i7a208.p.ssafy.io/api/v1/fakeusers")
    .then(res => {
      return res.json()
    })
    .then(data => {
      setUsers(data);
    })
    .then(data => {
      const emails = users.map(user => user.email)
      const index = emails.indexOf(email);
      // console.log(users[index].nickname)
      setNickname(users[index].nickname)
      setYoutubeId(users[index].youtube_id)
      setRobotId(users[index].robot_id)
    })
  });

  // const nickname = users[index].nickname;
  // const youtube_id = users[index].youtube_id;
  // const robot_id = users[index].robot_id;
  
  // console.log(users[index].username)

  return (
    <div>
      <br />
      <br />
      <h1 style={{textDecoration: "underline", textDecorationColor: "#a6eae2", textDecorationThickness: 5}}>회원정보</h1>
      <br />
      <br />
      <h5>이름 : {username}</h5>
      <br />
      <h5>이메일 : {email}</h5>
      <br />
      <h5>닉네임 : {nickname}</h5>
      <br />
      <h5>유튜브 계정 : {youtubeId}</h5>
      <br />
      <h5>로봇 등록 : 
        {robotId !== null
          ?
          " 등록 완료"
          :
          " 미등록 상태"
        }
      </h5>
    </div>
  )
};

export default User;