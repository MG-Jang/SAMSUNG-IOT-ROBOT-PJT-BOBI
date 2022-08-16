import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ArchiveVideoItem from "../../components/archive/ArchiveVideoItem";
import Modal from "../../components/modal/Modal";

function ArchiveVideo() {
  const [videoArchives, setVideoArchives] = useState([]);
  useEffect(() => {
    fetch("https://i7a208.p.ssafy.io/api/v1/archivevideos/")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setVideoArchives(data);
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
        영상 아카이브
      </h1>
      <br />
      <NavLink
        to="/archive-video/write"
        style={{ margin: "0 3% 0 30%", width: "10%" }}
      >
        <button>영상 올리기</button>
      </NavLink>
      <button onClick={openModal}>영상 올리는 방법</button>
      <Modal
        open={modalOpen}
        close={closeModal}
        header="영상 올리는 방법"
        submit={closeModal}
        submitMessage="close"
      >
        <p>유투브 스튜디오에서 영상 올리는 방법 여따가 쓰기</p>
      </Modal>
      <br />
      <br />
      {videoArchives.map((videoArchive) => (
        <ArchiveVideoItem key={videoArchive.id} item={videoArchive} />
      ))}
    </div>
  );
}

export default ArchiveVideo;
