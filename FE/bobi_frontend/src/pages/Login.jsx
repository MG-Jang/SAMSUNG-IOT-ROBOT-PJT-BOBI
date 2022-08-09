import React from "react";
import { GoogleLogin } from "react-google-login";
import { Navigate } from 'react-router-dom';

function Login() {


  const responseGoogle = (response) => {
    window.localStorage.setItem("user_id", response.googleId);
    window.localStorage.setItem("user_email", response.Ft.pu);
    window.localStorage.setItem("user_name", response.Ft.Ue);
    <Navigate to="/" />
  };

  const loginFailure = (error) => {
    console.log(error)
  };

  if (localStorage.getItem("user_id") !== null) {
    return (
      <Navigate to="/" />
    )
  };

  return (
    <>
      {/* <button type="button" onClick={loginButttonClick}>login</button> */}
      <GoogleLogin
        clientId="243625053777-t2htd7u0v85i9fnp0oq0cts7a3ba8tld.apps.googleusercontent.com"
        responseType="id_token"
        buttonText="구글 로그인 하기"
        onSuccess={responseGoogle}
        onFailure={loginFailure}
        // cookiePolicy={'single_host_origin'}
      />
    </>
  )
};

export default Login;