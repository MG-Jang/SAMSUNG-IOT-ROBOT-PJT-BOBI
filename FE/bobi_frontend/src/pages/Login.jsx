import React from "react";
// import axios from "axios";
// import { GoogleLogin, GoogleLogout } from "react-google-login";

function Login() {
  function loginButttonClick(e) {
    window.location.href = "https://accounts.google.com/o/oauth2/auth" +
    "/identifier?client_id=243625053777-t2htd7u0v85i9fnp0oq0cts7a3ba8tld.apps.googleusercontent.com" +
    "&redirect_uri=http://127.0.0.1:3000/loginSuccess/" +
    "&scope=email" +
    "&response_type=token" 
    
    const parsedHash = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = parsedHash.get("access_token");
  
    console.log(accessToken)
  }


  return (
    <>
      <button type="button" onClick={loginButttonClick}>login</button>
      {/* <GoogleLogin
        clientId={clientId}
        responseType="id_token"
        buttonText="구글 로그인 하기"
        onSuccess={handleSuccessLogin}
        onFailure={handleFailureLogin}/>

      <GoogleLogout
        clientId={clientId}
        buttonText="로그아웃"
        onLogoutSuccess={handleSuccessLogout} /> */}
    </>
  )
};

export default Login;