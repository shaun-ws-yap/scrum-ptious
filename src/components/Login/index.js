import React, { useState } from 'react';

export default function Login(props) {

  return (
    <form>
      <h1>Enter your user ID: </h1>
      <input
        onChange={event => props.setUser(event.target.value)}
      />
      <button
        onSubmit={event => props.setUser(event.target.value)}
      >Submit</button>
    </form>
  )
}