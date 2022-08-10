import React from "react";

function VoicePlay () {

  const S3ItemURL = "https://bobivoicebucket.s3.ap-northeast-2.amazonaws.com/bobi-dot.png"

  const handleDownload = () => {
    fetch(S3ItemURL, {method: 'GET'})
      .then(res => {
        console.log(res)
        return res.blob();
      })
      .then(blob => {
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'test.png';
        document.body.appendChild(a); 
        a.click();  
        setTimeout(
          _ => { window.URL.revokeObjectURL(url); }, 
          60000); 
        a.remove(); 
      })
      .catch(err => {
        console.error('err: ', err);
      })
  };


  return (
    <>
      <button onClick={handleDownload}>다운로드</button>
    </>
  );
};

export default VoicePlay;