import React, { useState } from "react";
import ArchiveVideoForm from "../../components/archive/ArchiveVideoForm";

function ArchiveVideoWrite() {
  const [ titleValue, setTitleValue ] = useState("");
  const [ contentValue, setContentValue ] = useState("");  
  const [ urlValue, setUrlValue ] = useState("")
  const date = new Date();

  const onTitleChange = (event) => {
    setTitleValue(event.currentTarget.value);
  };

  const onContentChange = (event) => {
    setContentValue(event.currentTarget.value);
  };

  const onUrlChange = (event) => {
    setUrlValue(event.currentTarget.value);
  }

  const ArchiveVideoSubmit = (event) => {
    event.preventDefault();
    fetch("https://i7a208.p.ssafy.io/api/v1/archivevideos/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body : JSON.stringify({
        title: titleValue,
        contents: contentValue,
        video_url: urlValue,
        datetime: date
      }),
      })
      .then((res) => res.json())
      .catch((err) => console.log("error : ", err))
      .then(window.location.href="/archiveVideo")
  };

  return (
    <div>
      <br />
      <h1 style={{textDecoration: "underline", textDecorationColor: "#a6eae2", textDecorationThickness: 5}}>영상 아카이브 작성</h1>
      <br />
      <ArchiveVideoForm
        titleValue={titleValue}
        urlValue={urlValue}
        contentValue={contentValue}
        handleTitleChange={onTitleChange}
        handleUrlChange={onUrlChange}
        handleContentChange={onContentChange}
        handleSubmit={ArchiveVideoSubmit}
        updateRequest={false}
      />
    </div>
  )
};

export default ArchiveVideoWrite;
