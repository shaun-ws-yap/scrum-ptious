import { React, useState } from 'react';


export default function InputBox(props) {
  const { onSend, userInfo } = props;
  const { id, name, team_id: teamId } = userInfo;
  const [ message, setMessage ] = useState('');

  const submitForm = (e) => {
    e.preventDefault();
    if (message) {
      onSend({message, timeSent: Date.now(), sender: name});
      setMessage('');
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
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}