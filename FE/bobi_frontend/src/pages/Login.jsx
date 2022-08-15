import React, { useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import { Navigate } from 'react-router-dom';
import styled from "styled-components";

const StyledMain = styled.main`
  .Main {
    text-align: center;
  }

  .Main-logo {
  height: 40vmin;
  pointer-events: none;
  }

  .Main-header {
  background-color: #E8EDF2;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
  }

  .Main-title {
  color: #000000;
  font-family: 'EF_hyunydororong';
  }
`;

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

  // 로컬스토리지에 user_name이 이미 있다는 것은 로그인을 한 상태이므로 메인으로 돌림
  if (localStorage.getItem("user_name") !== null) {
    return (
      <Navigate to="/user-detail" />
    )
  };

  // **you can access the token like this**
  // const accessToken = gapi.auth.getToken().access_token;
  // console.log(accessToken);

  const onSuccess = response => {
    window.localStorage.setItem("user_name", response.profileObj.name);
    window.localStorage.setItem("email", response.profileObj.email);
    console.log('SUCCESS', response);
    // window.location.href = "https://i7a208.p.ssafy.io/userDetail"
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
      <StyledMain>
        <div className="Main">
          <header className="Main-header">
            <img src="https://i.ibb.co/PGZd2Td/bobi-dot.png" className="Main-logo" alt="logo" />
            <h1 style={{fontSize: "60px"}}className="Main-title">BoBi</h1>
            <br />
            <br />
            <p style={{ color: "black"}}>보비를 만나려면 로그인해주세요!</p>
            <GoogleLogin
              clientId={googleClientId}
              onSuccess={onSuccess}
              onFailure={onFailure}
            />
          </header>
        </div>
      </StyledMain>
    </div>
  );
}

export default Login;
