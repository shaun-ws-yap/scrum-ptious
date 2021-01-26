import { React, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';


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
        <TextareaAutosize 
          className="chat-input"
          name="msg"
          type="text"
          placeholder="Your message"
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyPress={e => {
            if(e.key === 'Enter')
               submitForm(e);
            }}
        />
        <button className="chat-send" type="submit"><i class="material-icons">send</i></button>
      </form>
    </div>
  );
}