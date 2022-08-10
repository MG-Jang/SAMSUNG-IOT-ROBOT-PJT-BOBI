import React, { useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import { Navigate } from 'react-router-dom';

const googleClientId = process.env.REACT_APP_GOOGLE_API_KEY;

function Login() {  

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: googleClientId,
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
    window.localStorage.setItem("email", response.profileObj.email);
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
        clientId={googleClientId}
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
      {/* <GoogleLogout
        clientId={googleClientId}
        onLogoutSuccess={onLogoutSuccess}
      /> */}
    </div>
  );
}

export default Login;
