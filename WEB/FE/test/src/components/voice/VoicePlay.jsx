import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faFaceSmile } from "@fortawesome/free-solid-svg-icons";
import AWS from 'aws-sdk';


function VoicePlay() {
  const S3ItemURL =
    "https://bobivoicebucket.s3.ap-northeast-2.amazonaws.com/1_from_bobi.wav";
  const [source, setSource] = useState(""); // 재생할 오디오 소스 값
  const [isChecked, setIsChecked] = useState(false);
  const [id, setId] = useState("");
  // const email = localStorage.getItem("email");
  
  AWS.config.update({
    accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
  });
  
  const params = {
    Bucket: process.env.REACT_APP_S3_BUCKET,
    Key: `1_from_bobi.wav`,
  };

  const s3 = new AWS.S3();
  
  useEffect(()=> {

    s3.getObject(params, (err, data) => {
      if (err) {
        console.log(err, err.stack);
      } 
      const blob = new Blob([data.Body], {
        type:"X-wav"
      })
      const blobURL = URL.createObjectURL(blob)
      setSource(blobURL)
    });
  }, [])
  console.log(source)


  // const handleClick = (e) => {
  //     e.preventDefault();
  //   };
  
  //   const handleDownload = () => {
  //     const s3 = new AWS.S3();
  
  //     const params = {
  //       Bucket: process.env.REACT_APP_S3_BUCKET,
  //       Key: `1_from_bobi.wav`,
  //     };
  
  
  //     function downloadBlob(blob, name = `1_from_bobi.wav`) {
  //       // Convert your blob into a Blob URL (a special url that points to an object in the browser's memory)
  //       const blobUrl = URL.createObjectURL(blob);
  //       setSource(blobUrl)
  //       con
  //       // Create a link element
  //       const link = document.createElement('a');
  //       // Set link's href to point to the Blob URL
  //       link.href = blobUrl;
  //       link.download = name;
  //       // Append link to the body
  //       document.body.appendChild(link);
  //       // Dispatch click event on the link
  //       // This is necessary as link.click() does not work on the latest firefox
  //       link.dispatchEvent(
  //         new MouseEvent('click', {
  //           bubbles: true,
  //           cancelable: true,
  //           view: window,
  //         })
  //       );
  
  //       // Remove link from body
  //       document.body.removeChild(link);
  //     }
  
  //     s3.getObject(params, (err, data) => {
  //       if (err) {
  //         console.log(err, err.stack);
  //       } else {
  //         let csvBlob = new Blob([data.Body.toString()], {
  //           type: 'text/csv;charset=utf-8;',
  //         });
  //         downloadBlob(csvBlob, `1_from_bobi.wav`);
  //       }
  //     });
  //   };
  
  









  useEffect(() => {
    fetch(`https://i7a208.p.ssafy.io/api/v1/voicecheck`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const last = data.length - 1; // 가장 최신 데이터 출력
        const lastdata = data[last];
        setId(lastdata.id);
        if (lastdata.is_checked === true) {
          setIsChecked(true);
        }
      });
  }, []);

  // useEffect(() => {
  //   fetch(S3ItemURL)
  //     .then((res) => {
  //       console.log(res.url);
  //       return res.blob();
  //     })
  //     .then((blob) => URL.createObjectURL(blob))
  //     .then((url) => {
  //       setSource(url);
  //       console.log(source)
  //     });
  // }, []);

  const onCheck = () => {
    // if (email === "carerobotbobi@gmail.com") {
      fetch(`https://i7a208.p.ssafy.io/api/v1/voicecheck/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          is_checked: true,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log("error : ", err));
      setIsChecked(true);
    // } else {
      // alert("허가된 사용자가 아닙니다!");
    // };
  };

  return (
    <>
      <h1
        style={{
          textDecoration: "underline",
          textDecorationColor: "#a6eae2",
          textDecorationThickness: 5,
        }}
      >
        음성 수신
      </h1>
      <br />
      {isChecked ? (
        <h4 style={{ color: "#696969" }}>
          <FontAwesomeIcon icon={faFaceSmile} />
          &nbsp;&nbsp;&nbsp; 모든 메시지를 확인했어요!
        </h4>
      ) : (
        <h4 style={{ color: "#696969" }} onClick={onCheck}>
          <FontAwesomeIcon icon={faCommentDots} />
          &nbsp;&nbsp;&nbsp; 새로운 메시지가 도착했어요!
        </h4>
      )}
      <br />
      <div>
        <ReactPlayer
          volume={1}
          url={source}
          width="80%"
          height="50px"
          playing={false}
          controls={true}
          style={{ margin: "0 auto" }}
        />
      </div>
    </>
  );
}

export default VoicePlay;
