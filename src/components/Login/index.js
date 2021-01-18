import React, { useState } from 'react';

export default function Login(props) {

  return (
    <form
      // onChange={event => props.setUser(event.target.value)}
      // onSubmit={event => event.preventDefault()}
    >
      <h1>Enter your user ID: </h1>
      <input 
        value={props.user}
        onChange={event => props.setUser(event.target.value)}
      />
      <button
        onClick={event => props.setUser(event.target.value)}
      >Submit</button>
    </form>
  )
}