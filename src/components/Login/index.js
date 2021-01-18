import React, { useState } from 'react';

export default function Login(props) {

  return (
    <form
      onSubmit={event => props.setUser(event.target.value)}
    >
      <h1>Enter your user ID: </h1>
      <input 
        value={props.user}
        onSubmit={event => event.preventDefault()}
      />
    </form>
  )
}