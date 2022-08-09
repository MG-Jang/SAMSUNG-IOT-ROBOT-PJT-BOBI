import React, { useEffect, useState } from "react";
import ReactModal from "react-modal"

function StoryItem1_test({ onSubmit, onClose }) {
  const [ story, setStory ] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/v1/stories/1")
      .then(res => {
        return res.json();
    })
      .then((data) => {
        console.log(data);
        setStory(data);
    });
  }, []);

  const handleClickSubmit = () => {
    onSubmit();
  };

  const handleClickCancel = () => {
    onClose();
  };

  return (
    <ReactModal isOpen>
      <h1>{ story.title }</h1>
      <div>
        <button onClick={handleClickSubmit}>확인</button>
        <button onClick={handleClickCancel}>취소</button>
      </div>
      <p>{ story.content}</p>
    </ReactModal>
  )
};

export default StoryItem1_test;