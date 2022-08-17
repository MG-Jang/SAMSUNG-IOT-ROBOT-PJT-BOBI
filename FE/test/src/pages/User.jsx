import React, { useEffect } from "react";
import { useState } from "react";

function User() {
  const [users, setUsers] = useState([]);
  const [nickname, setNickname] = useState("");
  const [youtubeId, setYoutubeId] = useState("");
  const [robotId, setRobotId] = useState("");
  const username = localStorage.getItem("user_name");
  const email = localStorage.getItem("email");

  useEffect(() => {
    fetch("https://i7a208.p.ssafy.io/api/v1/fakeusers")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUsers(data);
      })
      .then((data) => {
        const emails = users.map((user) => user.email);
        const index = emails.indexOf(email);
        // console.log(users[index].nickname)
        setNickname(users[index].nickname);
        setYoutubeId(users[index].youtube_id);
        setRobotId(users[index].robot_id);
      });
  });

  // const nickname = users[index].nickname;
  // const youtube_id = users[index].youtube_id;
  // const robot_id = users[index].robot_id;

  // console.log(users[index].username)

  return (
    <div>
      <br />
      <br />
      <h1
        style={{
          textDecoration: "underline",
          textDecorationColor: "#a6eae2",
          textDecorationThickness: 5,
        }}
      >
        회원정보
      </h1>
      <div style={{ textAlign: "left", marginLeft: "10%" }}>
        <br />
        <br />
        <div style={{ fontSize: "6vw" }}>
          <span
            style={{
              backgroundColor: "#CEECF5",
              borderRadius: "3px",
              marginRight: "2%",
            }}
          >
            이름
          </span>
          <span> {username}</span>
        </div>
        <br />
        <div style={{ fontSize: "6vw" }}>
          <span
            style={{
              backgroundColor: "#FFF5DA",
              borderRadius: "3px",
              marginRight: "2%",
            }}
          >
            이메일
          </span>
          <span> {email}</span>
        </div>
        <br />
        <div style={{ fontSize: "6vw" }}>
          <span
            style={{
              backgroundColor: "#CDF0EA",
              borderRadius: "3px",
              marginRight: "2%",
            }}
          >
            닉네임
          </span>
          <span> {nickname}</span>
        </div>

        <br />
        <div style={{ fontSize: "6vw" }}>
          <span
            style={{
              backgroundColor: "#F7DBF0",
              borderRadius: "3px",
              marginRight: "2%",
            }}
          >
            유튜브 계정
          </span>
          <span> {youtubeId}</span>
        </div>
        <br />
        <div style={{ fontSize: "6vw" }}>
          <span
            style={{
              backgroundColor: "#F4E3DC",
              borderRadius: "3px",
              marginRight: "2%",
            }}
          >
            로봇 등록
          </span>
          <span>{robotId !== null ? " 등록 완료" : " 미등록 상태"}</span>
        </div>
      </div>
    </div>
  );
}

export default User;
