import React from "react";

function ArchiveImageForm(props) {

  return (
    <div>
      <form>
        {/* <label>제목 : </label> */}
        <p style={{marginRight: "48%", marginBottom: "0"}}>닉네임</p>
        <input
          onChange={props.handleTitleChange}
          value={props.titleValue}
          type="text"
          name="title"
          style={{width: "60%"}}
          placeholder="제목"
        />
        <br />
        <br />
        <p style={{marginRight: "52%", marginBottom: "0"}}>내용</p>
        {/* <label>내용 : </label> */}
        <textarea
          onChange={props.handleContentChange}
          value={props.contentValue}
          name="content"
          style={{width: "60%"}}
          placeholder="내용"
        />
        <button onClick={props.handleSubmit} style={{marginLeft: "48%", marginTop: "2%"}}>
          {props.updateRequest ? "수정" : "등록"}
        </button>
      </form>
    </div>
  );
}

export default ArchiveImageForm;

