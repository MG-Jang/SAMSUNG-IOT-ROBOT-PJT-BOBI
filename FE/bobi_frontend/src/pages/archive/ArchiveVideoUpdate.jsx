import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ArchiveVideoForm from "../../components/archive/ArchiveVideoForm";

function ArchiveVideoUpdate() {
  // state라는 props를 받아서 적용시킬 수 있다!
  const {state} = useLocation();
  const url = window.location.href;
  const id = url.split('/')[4];

  // console.log([ fetchTitle, fetchContent, fetchUrl ])

  const [ titleValue, setTitleValue ] = useState(state.title);
  const [ contentValue, setContentValue ] = useState(state.contents);  
  const [ urlValue, setUrlValue ] = useState(state.url)
  const date = new Date();

  const onTitleChange = (event) => {
    setTitleValue(event.currentTarget.value);
  };

  const onContentChange = (event) => {
    setContentValue(event.currentTarget.value);
  };

  const onUrlChange = (event) => {
    setUrlValue(event.currentTarget.value);
  };


  const ArchiveVideoUpdate = (event) => {
    event.preventDefault();
    fetch(`https://i7a208.p.ssafy.io/api/v1/archivevideos/${id}/`, {
      method: "PUT",
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
    window.location.href=`/archiveVideo/${id}`
  };

  return (
    <div>
      <br />
      <h1 style={{textDecoration: "underline", textDecorationColor: "#a6eae2", textDecorationThickness: 5}}>영상 아카이브 수정</h1>
      <br />
      <ArchiveVideoForm
        titleValue={titleValue}
        urlValue={urlValue}
        contentValue={contentValue}
        handleTitleChange={onTitleChange}
        handleUrlChange={onUrlChange}
        handleContentChange={onContentChange}
        handleSubmit={ArchiveVideoUpdate}
        updateRequest={true}
      />
    </div>
  )
};

export default ArchiveVideoUpdate;