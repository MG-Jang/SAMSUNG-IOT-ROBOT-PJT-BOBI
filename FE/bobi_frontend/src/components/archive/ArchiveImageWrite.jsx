import React, { useState } from "react";
import ArchiveImageForm from "../../components/archive/ArchiveImageForm";

function ArchiveImageWrite() {
  const [ titleValue, setTitleValue ] = useState("");
  const [ contentValue, setContentValue ] = useState("");  
  const date = new Date();

  const onTitleChange = (event) => {
    setTitleValue(event.currentTarget.value);
  };

  const onContentChange = (event) => {
    setContentValue(event.currentTarget.value);
  };


  const ArchiveVideoSubmit = (event) => {
    event.preventDefault();
    fetch("https://i7a208.p.ssafy.io/api/v1/archiveimages/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body : JSON.stringify({
        title: titleValue,
        contents: contentValue,
        // video_url: urlValue,
        datetime: date
      }),
      })
      .then((res) => res.json())
      .catch((err) => console.log("error : ", err))
      .then(window.location.href="/archiveImage")
  };

  return (
    <div>
      <br />
      <h1 style={{textDecoration: "underline", textDecorationColor: "#a6eae2", textDecorationThickness: 5}}>사진 아카이브 작성</h1>
      <br />
      <ArchiveImageForm
        titleValue={titleValue}
        contentValue={contentValue}
        handleTitleChange={onTitleChange}
        handleContentChange={onContentChange}
        handleSubmit={ArchiveVideoSubmit}
        updateRequest={false}
      />
    </div>
  )
};

export default ArchiveImageWrite;