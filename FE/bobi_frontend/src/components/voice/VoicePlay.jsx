import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faFaceSmile } from "@fortawesome/free-solid-svg-icons";

function VoicePlay () {

  const S3ItemURL = "https://bobivoicebucket.s3.ap-northeast-2.amazonaws.com/1_from_bobi.wav"
  const [ source, setSource ] = useState(""); // 재생할 오디오 소스 값
  const [ isChecked, setIsChecked ] = useState(false)
  const [ id, setId ] = useState("")


  useEffect(() => {
    fetch(`https://i7a208.p.ssafy.io/api/v1/voicecheck`)
      .then(res => {
        return res.json();
      })
      .then((data) => {
        const last = data.length - 1    // 가장 최신 데이터 출력
        const lastdata = data[last]
        setId(lastdata.id)
        if (lastdata.is_checked === true) {
          setIsChecked(true);
        };
      })
  }, []);
    
  useEffect(() => {
    fetch(S3ItemURL, {method: 'GET'})
    .then(res => {
      console.log(res.url)
      return res.blob();
    })
    .then((blob) => URL.createObjectURL(blob))
    .then((url) => {
      setSource(url);
    });
  }, [])

  const onCheck = () => {
    fetch(`https://i7a208.p.ssafy.io/api/v1/voicecheck/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body : JSON.stringify({
        is_checked: true,
      }),
    })
    .then((res) => res.json())
    .then((data)=> console.log(data))
    .catch((err) => console.log("error : ", err))
    setIsChecked(true)
  }


  return (
    <>
      <h1 style={{textDecoration: "underline", textDecorationColor: "#a6eae2", textDecorationThickness: 5}}>음성 수신</h1>
      <br />
      {isChecked 
        ? 
        <h4 style={{ color: "#696969" }}>
          <FontAwesomeIcon icon={faFaceSmile} />&nbsp;&nbsp;&nbsp;
        모든 메시지를 확인했어요!</h4> 
        : 
        <h4 style={{ color: "#696969" }} onClick={onCheck}>
          <FontAwesomeIcon icon={faCommentDots} />&nbsp;&nbsp;&nbsp;
          새로운 메시지가 도착했어요!
        </h4> 
      }
      <br />
      <div>
        <ReactPlayer
          url={source}
          width="80%"
          height="50px"
          playing={false}
          controls={true}
          style={{margin:"0 auto"}}
        />
      </div>
    </>
  );
};

export default VoicePlay;
