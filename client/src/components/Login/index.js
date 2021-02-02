import React, { useState } from 'react';

import '../../styles/Login.css';

export default function Login(props) {
  const { setLogin } = props;
  const [loginId, setLoginId] = useState(0);

  function handleLogin() {
    setLogin(loginId);
  }

  return (
    <div className="login-container">
      
      <ul className="box-area">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <div className="login">
          <h1>Enter your user ID </h1>
          <input
            onChange={event => setLoginId(event.target.value)}
          />
          <br />
          <span className="login-button" onClick={handleLogin}> 
            Submit
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </span>
          <div className="login-info">
            <p>User ID <strong>1</strong> - manager view</p>
            <p>User ID <strong>2 to 5</strong> - employee view</p>
          </div>
        </div>
      </ul>
    </div>
  )
}