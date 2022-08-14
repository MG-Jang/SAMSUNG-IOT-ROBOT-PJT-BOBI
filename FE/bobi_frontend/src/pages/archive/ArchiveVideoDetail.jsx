import React, { useEffect, useState } from "react";

function ArchiveVideoDetail() {
  const url = window.location.href;
  const id = url.split('/')[4];

  const [ archiveVideo, setArchiveVideo ] = useState([]);

  useEffect(() =>{
    fetch(`https://i7a208.p.ssafy.io/api/v1/archivevideos/${id}/`)
      .then(res => {
        return res.json();
      })
      .then((data) => {
        setArchiveVideo(data);
      })
  });

  const datetime = archiveVideo.datetime
  const date = (datetime||"").split("T")[0];
  const [year, month, day] = (date||"").split("-")
  const notDate = (datetime||"").split("T")[1];
  const time = (notDate||"").split("+")[0]
  const [hour, minute, second] = (time||'').split(":")
  // 진짜 이렇게까지 해야하나

  return (
    <div>
      <br />
      <h1 style={{textDecoration: "underline", textDecorationColor: "#a6eae2", textDecorationThickness: 5}}>영상 아카이브</h1>
      <br />
      <iframe src={archiveVideo.video_url} width="560" height="315" frameborder="0"/>
      <br />
      <br />
      <h2>{archiveVideo.title}</h2>
      <br />
      <h5>작성일 : {year}년 {month}월 {day}일</h5>
      <h5>작성시간 : {hour}시 {minute}분</h5>
      <br />
      <p>{archiveVideo.contents}</p>
    </div>
  )
};

export default ArchiveVideoDetail;