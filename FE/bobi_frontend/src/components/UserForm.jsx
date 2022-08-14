import React from "react";

function UserForm (props) {

  return (
    <>
      <form>
        <br />
        <label>닉네임 : </label>
        <input
          onChange={props.handleNicknameChange}
          value={props.nicknameValue}
          type="text"
          name="nickname"
        />
        <br />
        <br />
        <div>
          <label>Youtube 계정 : </label>
          <input
            onChange={props.handleYoutubeChange}
            value={props.youtubeValue}
            type="text"
            name="youtube"
          />
        <br />
        <br />
        </div>
        <div>
          <label>Robot_Id : </label>
          <textarea
            onChange={props.handleRobotIdChange}
            value={props.robotIdValue}
            name="content"
          />
        </div>
        <button onClick={props.handleSubmit}>
          {props.updateRequest ? "수정" : "등록"}
        </button>
      </form>
    </>
  )
};

export default UserForm;
