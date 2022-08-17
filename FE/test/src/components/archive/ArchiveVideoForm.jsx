import React from "react";

function ArchiveVideoForm(props) {
  return (
    <div>
      <form>
        {/* <label>제목 : </label> */}
        <p style={{ marginRight: "48%", marginBottom: "0" }}> 제목</p>
        <input
          onChange={props.handleTitleChange}
          value={props.titleValue}
          type="text"
          name="title"
          style={{ width: "60%" }}
          placeholder="제목"
        />
        <br />
        <br />
        {/* <label>Url : </label> */}
        <p style={{ marginRight: "38%", marginBottom: "0" }}>Youtube URL</p>
        <input
          onChange={props.handleUrlChange}
          value={props.urlValue}
          type="text"
          name="url"
          style={{ width: "60%" }}
          placeholder="Youtube URL"
        />
        <br />
        <br />
        {/* <label>내용 : </label> */}
        <p style={{ marginRight: "52%", marginBottom: "0" }}>내용</p>
        <textarea
          onChange={props.handleContentChange}
          value={props.contentValue}
          name="content"
          style={{ width: "60%" }}
          placeholder="내용"
        />
        <br />
        <button
          onClick={props.handleSubmit}
          style={{ marginLeft: "48%", marginTop: "2%" }}
        >
          {props.updateRequest ? "수정" : "등록"}
        </button>
      </form>
    </div>
  );
}

export default ArchiveVideoForm;
