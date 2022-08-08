import React from "react";
// import { GoogleLogin, GoogleLogout } from "react-google-login";

function Login() {
  function loginButttonClick(e) {
    window.location.href = "https://accounts.google.com/o/oauth2/auth/identifier?client_id=243625053777-t2htd7u0v85i9fnp0oq0cts7a3ba8tld.apps.googleusercontent.com&redirect_uri=http://127.0.0.1:3000/&scope=profile%20email&response_type=code&state=md23KmNHs6qM&flowName=GeneralOAuthFlow"
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