import React from "react";

function ArchiveImageForm(props) {

  return (
    <div>
      <form>
        <br />
        <label>제목 : </label>
        <input
          onChange={props.handleTitleChange}
          value={props.titleValue}
          type="text"
          name="title"
        />
        <br />
        <br />
        <div>
          <label>내용 : </label>
          <textarea
            onChange={props.handleContentChange}
            value={props.contentValue}
            name="content"
          />
        </div>
        <button onClick={props.handleSubmit}>
          {props.updateRequest ? "수정" : "등록"}
        </button>
      </form>
    </div>
  );
}

export default ArchiveImageForm;

