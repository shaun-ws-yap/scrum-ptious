import React, { useState } from 'react';

import '../../styles/Login.css';

export default function Login(props) {
  const { setLogin } = props;
  return (
    <div className="tmp">
    <form>
      <div className="login">
      <h1>Enter your user ID </h1>
      <input
        onChange={event => setLogin(event.target.value)}
      />
      <br />
      <span
        className="login-button"
        onSubmit={event => setLogin(event.target.value)}
      >
        Submit
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      </span>
      </div>
    </form>
    </div>
  )
}