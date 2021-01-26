import React, { useState } from 'react';

export default function Login(props) {
  const { setLogin } = props;
  return (
    <form>
      <h1>Enter your user ID: </h1>
      <input
        onChange={event => setLogin(event.target.value)}
      />
      <button
        onSubmit={event => setLogin(event.target.value)}
      >Submit</button>
    </form>
  )
}