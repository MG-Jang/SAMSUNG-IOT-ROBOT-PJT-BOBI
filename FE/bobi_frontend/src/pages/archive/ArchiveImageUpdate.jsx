import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ArchiveImageForm from "../../components/archive/ArchiveImageForm";

function ArchiveImageUpdate() {
  const {state} = useLocation();
  const url = window.location.href;
  const id = url.split('/')[4];

  const [ titleValue, setTitleValue ] = useState(state.title);
  const [ contentValue, setContentValue ] = useState(state.contents);  
  const date = new Date();
  const imageUrl = state.url;

  const onTitleChange = (event) => {
    setTitleValue(event.currentTarget.value);
  };

  const onContentChange = (event) => {
    setContentValue(event.currentTarget.value);
  };

  const ArchiveImageUpdate = (event) => {
    event.preventDefault();
    fetch(`https://i7a208.p.ssafy.io/api/v1/archiveimages/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body : JSON.stringify({
        title: titleValue,
        contents: contentValue,
        img_url: imageUrl,
        datetime: date,
      }),
    })
    .then((res) => res.json())
    .then((data)=> console.log(data))
    .catch((err) => console.log("error : ", err))
    window.location.href=`/archiveImage/${id}`
  };


  return (
    <div>
      <br />
      <h1 style={{textDecoration: "underline", textDecorationColor: "#a6eae2", textDecorationThickness: 5}}>사진 아카이브 수정</h1>
      <br />
      <ArchiveImageForm
        titleValue={titleValue}
        contentValue={contentValue}
        handleTitleChange={onTitleChange}
        handleContentChange={onContentChange}
        handleSubmit={ArchiveImageUpdate}
        updateRequest={false}
      />
    </div>
  )
};

export default ArchiveImageUpdate;