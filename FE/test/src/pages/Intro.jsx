import React from "react";

function Intro() {
  return (
    <div>
      <img
        style={{ height: "50vw" }}
        src="https://i.ibb.co/2yFZd66/bobi-blue-dot.png"
        alt="bobi_blue"
      />
      <div>
        <span
          style={{
            fontSize: "2rem",
            color: "#C24CF6",
            fontFamily: "Pretendard-Regular",
            fontWeight: "bold",
          }}
        >
          보비{" "}
        </span>
        <span
          style={{
            fontFamily: "Pretendard-Regular",
            color: "#696969",
            fontWeight: "bold",
          }}
        >
          [명] 보조하여 돌봄
        </span>
      </div>
      <br />
      <img
        style={{ width: "90%" }}
        src="https://i.ibb.co/bKq7Nqf/Kakao-Talk-20220810-221222948.png"
        alt="bobi_text"
      />
      <br />
      <br />
      <br />
      <div
        style={{
          backgroundColor: "#F4F4F3",
          marginLeft: "10%",
          marginRight: "10%",
          paddingTop: "5px",
        }}
      >
        <p style={{ color: "#D964FA", marginBottom: "3px" }}>
          하이 보비, 이야기 들려줘!
        </p>
        <p style={{ fontFamily: "Pretendard-Regular" }}>라고 말해보세요 😊</p>
      </div>
    </div>
  );
}

export default Intro;
