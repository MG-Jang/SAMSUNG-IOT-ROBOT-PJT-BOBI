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
        submitMessage="닫기"
      >
        <div style={{ fontFamily: "Pretendard-Regular" }}>
          <p>
            유튜브 계정의 "내 채널"로 들어가서, 저장하고 싶은 순간이 포함된
            영상을 클릭해주세요!
          </p>
          <p>
            영상 아래의 "클립"을 누른 후, 자르고 싶은 부분을 선택한 후 "클립
            공유"를 눌러주세요!
          </p>
          <p>
            공유 아래의 "퍼가기"를 누른 후에 텍스트 안의
            "https://www.youtube.com/embed/"로 시작되는 링크를 전체
            복사해주세요!
          </p>
          <p>
            [영상 올리기] 버튼을 누른 후 복사해 둔 유튜브 링크를 입력해주세요.
            제목과 내용도 모두 입력해야 업로드 가능한 것, 잊지 마세요!
          </p>
        </div>
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
