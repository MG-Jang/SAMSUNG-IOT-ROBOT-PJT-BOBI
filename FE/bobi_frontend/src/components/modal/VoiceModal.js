import React from "react";
import styled from "styled-components";

const StyledModal = styled.div`
  .modal {
    display: none;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.6);
  }
  .modal button {
    outline: none;
    cursor: pointer;
    border: 0;
  }
  .modal > section {
    width: 90%;
    max-width: 450px;
    margin: 0 auto;
    border-radius: 0.3rem;
    background-color: #fff;
    /* 팝업이 열릴때 스르륵 열리는 효과 */
    animation: modal-show 0.3s;
    overflow: hidden;
  }
  .modal > section > header {
    position: relative;
    padding: 16px 64px 16px 16px;
    background-color: #f1f1f1;
    font-weight: 700;
  }
  .modal > section > header button {
    position: absolute;
    top: 12px;
    right: 15px;
    width: 30px;
    font-size: 21px;
    font-weight: 700;
    text-align: center;
    color: #999;
    background-color: transparent;
  }
  .modal > section > main {
    padding: 25px 16px 10px;
    border-bottom: 1px solid #dee2e6;
    border-top: 1px solid #dee2e6;
  }
  .modal > section > footer {
    padding: 12px 16px;
    text-align: right;
  }
  .modal > section > footer button .cancel {
    padding: 8px 12px 5px;
    color: #fff;
    background-color: #6c757d;
    border-radius: 5px;
    font-size: 15px;
  }
  .modal > section > footer button .submit {
    padding: 8px 12px 5px;
    color: #a6eae2;
    background-color: #a6eae2;
    border-radius: 5px;
    font-size: 15px;
  }
  .modal.openModal {
    display: flex;
    align-items: center;
    /* 팝업이 열릴때 스르륵 열리는 효과 */
    animation: modal-bg-show 0.3s;
  }
  @keyframes modal-show {
    from {
      opacity: 0;
      margin-top: -50px;
    }
    to {
      opacity: 1;
      margin-top: 0;
    }
  }
  @keyframes modal-bg-show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

function VoiceModal(props) {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header, submit, submitMessage, cancel } = props;

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <StyledModal>
      <div className={open ? "openModal modal" : "modal"}>
        {open ? (
          <section>
            <header>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {header}
              <button className="close" onClick={close}>
                &times;
              </button>
            </header>
            <main>{props.children}</main>
            <footer>
              <span>
                <button className="submit" onClick={submit}>
                  {submitMessage}
                </button>
                &nbsp;&nbsp;&nbsp;
                <button className="cancel" onClick={cancel}>
                  취소
                </button>
              </span>
            </footer>
          </section>
        ) : null}
      </div>
    </StyledModal>
  );
}

export default VoiceModal;
