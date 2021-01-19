import { React, useState } from 'react';


export default function InputBox(props) {
  const { onSend } = props;
  const [ msg, setMsg ] = useState('');

  const submitForm = (e) => {
    e.preventDefault();
    if (msg) {
      onSend(msg);
      setMsg('');
    }
  };

  return (
    <div className="input-box">
      <form 
        autoComplete="off"
        onSubmit={e => submitForm(e)}
      >
        <input 
          name="msg"
          type="text"
          placeholder="Your message"
          value={msg}
          onChange={e => setMsg(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}