import React from "react";
import styled from "styled-components";
// import html2canvas from "html2canvas";
// import VoiceModal from "../components/modal/VoiceModal"

const StyledMain = styled.main`
.div {
  text-align: center;
  justify-content: center;
  align-items: center;
}
.h1 {
  text-align: center;
}
  }
`;



function Live() {
  // const [modalOpen, setModalOpen] = useState(false);

  // // html2canvas 사용시도
  // const onCapture = () => {
  //   console.log("Capture!");
  //   html2canvas(document.body)
  //   .then((canvas) => {
  //       // display, save as jpeg
  //       onSaveAs(canvas.toDataURL("capture/png"), "capture-download.png")
  //    })
  // };
  
  // const onSaveAs = ( uri, filename ) => {
  //   console.log("Save!");
  //   const link = document.createElement("a");
  //   link.href = uri;
  //   link.download = filename;
  //   link.click();
  //   // document.body.removeChild(link);
  // };

  // // S3 업로드
  // const config = {
  //   bucketName: S3_BUCKET,
  //   region: REGION,
  //   accessKeyId: ACCESS_KEY,
  //   secretAccessKey: SECRET_ACCESS_KEY,
  // };
  
  // const handleUpload = async (file) => {
  //   uploadFile(file, config)
  //     .then(data => console.log(data))
  //     .catch(err => console.error(err))
  //     setModalOpen(false);
  // };


  // const closeModal = () => {
  //   setModalOpen(false);
  // };

  // const captureCancel = () => {
  //   setModalOpen(false);
  // };

  return (
    <div>
      <StyledMain>
        <div className="div" id="test2">
          <br />
          <h1>Youtube Live</h1>
          <br />
          <iframe id="youtube_live" title="Live" width="560" height="315" src="https://www.youtube.com/embed/live_stream?channel=UC0Hu-_pAlzKFhiZPqDAUbIw" frameBorder="0" allowFullScreen></iframe>
        </div>
      </StyledMain>

      {/* <VoiceModal open={modalOpen} close={closeModal} header="보비에게 보내기" submit={() => handleUpload(imageFile)} submitMessage="보내기" cancel={captureCancel}>

      </VoiceModal> */}
    </div>
  )
};

export default Live;