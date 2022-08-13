import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronUp, faCircleChevronDown, faCircleChevronLeft, faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";


function ControlButtonDummy() {
  const [ isForward, setIsForward ] = useState(false);
  const [ isBackward, setIsBackward ] = useState(false);
  const [ isLeft, setIsLeft ] = useState(false);
  const [ isRight, setIsRight ] = useState(false);

  const moveForward = () => {
    setIsForward(true);
  };

  const stopForward = () => {
    setIsForward(false);
  };

  const moveBack = () => {
    setIsBackward(true);
  }

  const stopBack = () => {
    setIsBackward(false);
  }

  const moveRight = () => {
    setIsRight(true);
  }

  const stopRight = () => {
    setIsRight(false);
  }

  const moveLeft = () => {
    setIsLeft(true);
  }

  const stopLeft = () => {
    setIsLeft(false);
  }

  return (
    <div>
      <br />
      <div onMouseDown={() => moveForward()} onMouseUp={() => stopForward()} style={{width: "60px", margin:"0 auto"}}>
        {isForward
          ? <FontAwesomeIcon icon={faCircleChevronUp} style={{height: "55px", color:"#a6eae2"}}/>
          : <img style={{ height: "60px" }} src="https://cdn-icons-png.flaticon.com/512/992/992703.png"  alt="buttonForward"/>
        }
      </div>
      <div style={{display: "flex"}}>
        <div onMouseDown={() => moveLeft()} onMouseUp={() => stopLeft()} style={{width: "60px", margin:"0 35px 0 auto"}}>
          {isLeft
            ? <FontAwesomeIcon icon={faCircleChevronLeft} style={{height: "55px", color:"#a6eae2"}}/>
            : <img src="https://cdn-icons-png.flaticon.com/512/318/318276.png" style={{height:"60px"}} alt="buttonLeft"/>
          }
        </div>
        <div onMouseDown={() => moveRight()} onMouseUp={() => stopRight()} style={{width: "60px", margin:"0 auto 0 35px"}}>
          {isRight
            ? <FontAwesomeIcon icon={faCircleChevronRight} style={{height: "55px", color:"#a6eae2"}}/>
            : <img style={{ height: "60px" }} src="https://cdn-icons-png.flaticon.com/512/318/318275.png" alt="buttonRight" />
          }
        </div>
      </div>
      <div onMouseDown={() => moveBack()} onMouseUp={() => stopBack()} style={{width: "60px", margin:"0 auto"}}>
        {isBackward
          ? <FontAwesomeIcon icon={faCircleChevronDown} style={{height: "55px", color:"#a6eae2"}}/>
          : <img style={{ height: "60px" }} src="https://cdn-icons-png.flaticon.com/512/318/318278.png" alt="buttonBackward"/>
        }
      
      </div>
      <br />

    </div>
  )
};

export default ControlButtonDummy;