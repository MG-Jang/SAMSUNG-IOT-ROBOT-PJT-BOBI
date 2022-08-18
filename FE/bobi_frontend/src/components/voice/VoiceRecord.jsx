import React, { useState, useCallback } from "react";
import { uploadFile } from "react-s3";
import VoiceModal from "../modal/VoiceModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPause,
  faPaperPlane,
  faMicrophoneLines,
} from "@fortawesome/free-solid-svg-icons";
// import mqtt from "mqtt/dist/mqtt";

window.Buffer = window.Buffer || require("buffer").Buffer;
// ReferenceError: Buffer is not defined 에러때문에 넣음

const S3_BUCKET = process.env.REACT_APP_S3_BUCKET;
const REGION = process.env.REACT_APP_S3_REGION;
const ACCESS_KEY = process.env.REACT_APP_S3_ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.REACT_APP_S3_SECRET_ACCESS_KEY;

function VoiceRecord() {
  const [stream, setStream] = useState();
  const [media, setMedia] = useState();
  const [onRec, setOnRec] = useState(true);
  const [source, setSource] = useState();
  const [analyser, setAnalyser] = useState();
  const [isRecorded, setIsRecorded] = useState(false);
  const [audioUrl, setAudioUrl] = useState();
  const [audioFile, setAudioFile] = useState();
  const [modalOpen, setModalOpen] = useState(false);

  const email = localStorage.getItem("email");

  const onRecAudio = () => {
    // 음원정보를 담은 노드를 생성하거나 음원을 실행또는 디코딩 시키는 일을 한다
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    // 자바스크립트를 통해 음원의 진행상태에 직접접근에 사용된다.
    const analyser = audioCtx.createScriptProcessor(0, 1, 1);
    setAnalyser(analyser);

    function makeSound(stream) {
      // 내 컴퓨터의 마이크나 다른 소스를 통해 발생한 오디오 스트림의 정보를 보여준다.
      const source = audioCtx.createMediaStreamSource(stream);
      setSource(source);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
    }
    // 마이크 사용 권한 획득
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      setStream(stream);
      setMedia(mediaRecorder);
      makeSound(stream);

      analyser.onaudioprocess = function (e) {
        // 3분(180초) 지나면 자동으로 음성 저장 및 녹음 중지
        if (e.playbackTime > 180) {
          stream.getAudioTracks().forEach(function (track) {
            track.stop();
          });
          mediaRecorder.stop();
          // 메서드가 호출 된 노드 연결 해제
          analyser.disconnect();
          audioCtx.createMediaStreamSource(stream).disconnect();

          mediaRecorder.ondataavailable = function (e) {
            setAudioUrl(e.data);
            setOnRec(true);
          };
        } else {
          setOnRec(false);
        }
      };
    });
  };

  // 사용자가 음성 녹음을 중지했을 때
  const offRecAudio = () => {
    // dataavailable 이벤트로 Blob 데이터에 대한 응답을 받을 수 있음
    media.ondataavailable = function (e) {
      setAudioUrl(e.data);
      setOnRec(true);
    };

    // 모든 트랙에서 stop()을 호출해 오디오 스트림을 정지
    stream.getAudioTracks().forEach(function (track) {
      track.stop();
    });

    // 미디어 캡처 중지
    media.stop();
    // 메서드가 호출 된 노드 연결 해제
    analyser.disconnect();
    source.disconnect();
    setIsRecorded(true);
  };

  const onSubmitAudioFile = useCallback(() => {
    if (audioUrl) {
      console.log(URL.createObjectURL(audioUrl)); // 출력된 링크에서 녹음된 오디오 확인 가능
    }
    // const soundUrl = URL.createObjectURL(audioUrl);
    // File 생성자를 사용해 파일로 변환
    const sound = new File([audioUrl], "1_from_web.wav", {
      lastModified: new Date().getTime(),
      type: "audio",
    });
    console.log(sound); // File 정보 출력
    setAudioFile(sound);
    setModalOpen(true);
  }, [audioUrl]);

  //s3 업로드 관련 코드
  const config = {
    bucketName: S3_BUCKET,
    region: REGION,
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
  };

  // mqtt 연결
  // const host = "i7a208.p.ssafy.io";
  // const port = "9001";
  // const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;
  // const connectUrl = `ws://${host}:${port}/mqtt`;
  // const client = mqtt.connect(connectUrl, {
  //   clientId,
  //   clean: true,
  //   connectTimeout: 4000,
  //   reconnectPeriod: 1000,
  // });

  const handleUpload = async (file) => {
    if (email === "carerobotbobi@gmail.com") {
      //   const topic = `WebSendVoice`;
      //   const payload = "on";
      //   client.publish(topic, payload, (error) => {
      //     if (error) {
      //       console.log("Publish error: ", error);
      //     }
      //     console.log("Published!");
      //   });

      uploadFile(file, config)
        .then((data) => console.log(data))
        .catch((err) => console.error(err));
      setModalOpen(false);
    } else {
      alert("허가된 사용자가 아닙니다!");
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const recordCancel = () => {
    setIsRecorded(false);
    setModalOpen(false);
  };

  return (
    <>
      <br />
      <br />
      <h1
        style={{
          textDecoration: "underline",
          textDecorationColor: "#a6eae2",
          textDecorationThickness: 5,
        }}
      >
        음성 송신
      </h1>
      <br />
      <div>
        {onRec ? (
          <h3 style={{ color: "#696969" }} onClick={onRecAudio}>
            <FontAwesomeIcon icon={faMicrophoneLines} />
            &nbsp;&nbsp;&nbsp; 보비에게 말하기
          </h3>
        ) : (
          <h3 style={{ color: "#696969" }} onClick={offRecAudio}>
            <FontAwesomeIcon icon={faPause} />
            &nbsp;&nbsp;&nbsp; 보비에게 말하는 중
          </h3>
        )}
      </div>
      <br />
      {isRecorded ? (
        <h3 style={{ color: "#696969" }} onClick={onSubmitAudioFile}>
          <FontAwesomeIcon icon={faPaperPlane} />
          &nbsp;&nbsp;&nbsp; 보비에게 보내기
        </h3>
      ) : (
        <h3>&nbsp;</h3>
      )}
      <VoiceModal
        open={modalOpen}
        close={closeModal}
        header="보비에게 보내기"
        submit={() => handleUpload(audioFile)}
        submitMessage="보내기"
        cancel={recordCancel}
      >
        <p>&nbsp;&nbsp;보비에게 메시지를 보낼까요?</p>
      </VoiceModal>
      <br />
      {/* <button onClick={() => handleUpload(audioFile)}>업로드</button> */}
    </>
  );
}

export default VoiceRecord;
