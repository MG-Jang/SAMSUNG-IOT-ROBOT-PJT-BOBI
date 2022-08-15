import React from "react";

function UserForm (props) {
  return (
    <>
      <form>
        {/* <label>닉네임 : </label>&nbsp; */}
        <p style={{marginRight: "48%", marginBottom: "0"}}>닉네임</p>
        <input
          onChange={props.handleNicknameChange}
          value={props.nicknameValue}
          type="text"
          name="nickname"
          style={{width: "60%"}}
          placeholder="닉네임"
        />
        <br />
        <br />
        <p style={{marginRight: "37%", marginBottom: "0"}}>Youtube 계정</p>
        <input
          onChange={props.handleYoutubeChange}
          value={props.youtubeValue}
          type="text"
          name="youtube"
          style={{width: "60%"}}
          placeholder="Youtube 계정"
        />
        <br />
        <br />
        <p style={{marginRight: "45%", marginBottom: "0"}}>Robot ID</p>
        <input
          onChange={props.handleRobotIdChange}
          value={props.robotIdValue}
          type="text"
          name="robotId"
          style={{width: "60%"}}
          placeholder="Robot ID"
        />
        <br />
        <button onClick={props.handleSubmit} style={{marginLeft: "48%", marginTop: "5%"}}>
          {props.updateRequest ? "수정" : "등록"}
        </button>
      </form>
    </>
  )
};

export default UserForm;
