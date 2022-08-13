import React, { useEffect, useState } from "react";

function ArchiveImageDetail() {
  const url = window.location.href;
  const id = url.split('/')[4];

  const [ archiveImage, setArchiveImage ] = useState([]);

  useEffect(() => {
    fetch(`https://i7a208.p.ssafy.io/api/v1/archiveimages/${id}/`)
      .then(res => {
        return res.json();
      })
      .then((data) => {
        setArchiveImage(data);
      });
  }, []);
  console.log(archiveImage.datetime)
  const datetime = archiveImage.datetime

  const date = (datetime||"").split("T")[0];
  const [year, month, day] = (date||"").split("-")
  const notDate = (datetime||"").split("T")[1];
  const time = (notDate||"").split("+")[0]
  const [hour, minute, second] = (time||'').split(":")
  // console.log(hour, minute, second)

  return (
    <div>
      <br />
      <h1 style={{textDecoration: "underline", textDecorationColor: "#a6eae2", textDecorationThickness: 5}}>사진 아카이브</h1>
      <br />
      <img src={archiveImage.img_url} alt="archiveImage" width="60%"/>
      <br />
      <br />
      <h2>{archiveImage.title}</h2>
      <br />
      <h5>작성일 : {year}년 {month}월 {day}일</h5>
      <h5>작성시간 : {hour}시 {minute}분</h5>
      <br />
      <p>{archiveImage.contents}</p>
    </div>
  )
};

export default ArchiveImageDetail;