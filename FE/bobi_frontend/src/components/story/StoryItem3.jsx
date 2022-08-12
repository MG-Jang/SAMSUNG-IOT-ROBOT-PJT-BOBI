import React, { useEffect, useState } from "react";
import Modal from "../modal/Modal";

function StoryItem3() {
  const [ story, setStory ] = useState([]);

  useEffect(() => {
    fetch("https://i7a208.p.ssafy.io/api/v1/stories/3/")
      .then(res => {
        return res.json();
    })
      .then((data) => {
        // console.log(data);
        setStory(data);
    });
  }, []);

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <React.Fragment>
      <button onClick={openModal}>3. {story["title"]}</button>
      <Modal open={modalOpen} close={closeModal} header={story.title} submit={closeModal} submitMessage="close">
        <p>{story["content"]}</p>
      </Modal>
    </React.Fragment>
  )
};

export default StoryItem3;