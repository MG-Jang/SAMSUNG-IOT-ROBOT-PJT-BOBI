// import React, { useEffect, useState } from "react";
import React from "react";
// import useModals from "../modal/UseModals";
// import { modals } from "../modal/Modals";
// import Modal from "../modal/Modal";
import StoryItem1 from "./StoryItem1";
import StoryItem2 from "./StoryItem2";

function StoryList() {
  // const [ stories, setStories ] = useState([]);

  // useEffect(() => {
  //   fetch("http://127.0.0.1:8000/api/v1/stories")
  //     .then(res => {
  //       return res.json();
  //   })
  //     .then((data) => {
  //       console.log(data);
  //       setStories(data);
  //   });
  // }, []);

  // const [modalOpen, setModalOpen] = useState(false);

  // const openModal = () => {
  //   setModalOpen(true);
  // };
  // const closeModal = () => {
  //   setModalOpen(false);
  // };

  // const { openModal } = useModals();

  // const handleClick = () => {
  //   openModal(modals.storyItem1, {
  //     onSubmit: () => {
  //       console.log('비지니스 로직 처리...');
  //     },
  //   });
  //   console.log("hi")
  // };

  return (
    <React.Fragment>
      <StoryItem1 />
      <StoryItem2 />
      {/* { stories.map(story => (
        <ul key={story.story_id}>
          <button onClick={openModal}>{story.title}</button>
          <Modal open={modalOpen} close={closeModal} header={story.title}>
            {story.content}
          </Modal>
        </ul>
      ))} */}
      {/* <div>
        <button onClick={handleClick}>story1</button>
      </div> */}
    </React.Fragment>
  )
};

export default StoryList;