import React, { useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import { Navigate } from 'react-router-dom';

function Login() {  
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: "243625053777-t2htd7u0v85i9fnp0oq0cts7a3ba8tld.apps.googleusercontent.com",
        scope: 'email',
      });
    }

    gapi.load('client:auth2', start);
  }, []);

  if (localStorage.getItem("user_name") !== null) {
    return (
      <Navigate to="/" />
    )
  };

  // **you can access the token like this**
  // const accessToken = gapi.auth.getToken().access_token;
  // console.log(accessToken);

  const onSuccess = response => {
    window.localStorage.setItem("user_name", response.profileObj.name);
    console.log('SUCCESS', response);
    window.location.reload()
  };

  const onFailure = response => {
    console.log('FAILED', response);
  };
  // const onLogoutSuccess = () => {
  //   console.log('SUCESS LOG OUT');
  // };

  return (
    <div>
      <GoogleLogin
        clientId="243625053777-t2htd7u0v85i9fnp0oq0cts7a3ba8tld.apps.googleusercontent.com"
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
      {/* <GoogleLogout
        clientId="243625053777-t2htd7u0v85i9fnp0oq0cts7a3ba8tld.apps.googleusercontent.com"
        onLogoutSuccess={onLogoutSuccess}
      /> */}
    </div>
  );
}

export default Login;
