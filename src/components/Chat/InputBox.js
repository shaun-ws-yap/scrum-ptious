import React from 'react';


export default function InputBox(props) {
  return (
    <div className="input-box">
      <form method="POST" >
        <textarea placeholder="Your message"></textarea>
      </form>
      <button>Send</button>
    </div>
  )
}