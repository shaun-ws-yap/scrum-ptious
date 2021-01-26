import { React, useState } from 'react';

export default function InputBox(props) {
  const { sendMessage } = props;
  const [ message, setMessage ] = useState('');

  const submitForm = (e) => {
    e.preventDefault();
    if (message) {
      sendMessage( message );
      setMessage('');
    }
  };

  return (
    <div className="chat-input-box">
      <form 
        autoComplete="off"
        onSubmit={e => submitForm(e)}
      >
        <textarea 
          className="chat-input"
          name="msg"
          type="text"
          placeholder="Your message"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <button className="chat-send" type="submit"><i class="material-icons">send</i></button>
      </form>
    </div>
  );
}