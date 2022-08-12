import React, { useState, useEffect } from "react";
import AudioPlayer from 'react-h5-audio-player';

function VoicePlay () {

  const S3ItemURL = "https://bobivoicebucket.s3.ap-northeast-2.amazonaws.com/1_from_bobi.wav"
  // const [audio, setAudio] = useState(new Audio()); // audio 엘리먼트
  const [source, setSource] = useState(); // 재생할 오디오 소스 값

  useEffect(() => {
    fetch(S3ItemURL, {method: 'GET'})
      .then(res => {
        console.log(res.url)
        return res.blob();
      })
      .then((blob) => URL.createObjectURL(blob))
      .then((url) => {
        setSource(url);
        // setAudio(new Audio(url));
      });
  }, []);


  return (
    <>
      <h1 style={{textDecoration: "underline", textDecorationColor: "#a6eae2", textDecorationThickness: 5}}>음성 수신</h1>
      <br />
      <AudioPlayer
        src={source}
        showDownloadProgress={true}
        autoPlay={false}
        volume={0.8}
      />
    </>
  );
};

export default VoicePlay;
