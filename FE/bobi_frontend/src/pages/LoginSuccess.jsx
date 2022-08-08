import React from "react";

function LoginSuccess() {
  
  const parsedHash = new URLSearchParams(window.location.hash.substring(1));
  const accessToken = parsedHash.get("access_token");
  
  console.log(accessToken)
//   const { data } = await Api.post("oauth/google", { accessToken });
  
  return (
    <>
      <p>login success</p>
    </>
  )
};

export default LoginSuccess;