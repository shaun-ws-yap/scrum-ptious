import { React, useEffect } from 'react';

import ChatLog from "./ChatLog";
import MembersList from "./MembersList";
import InputBox from "./InputBox";

import '../../styles/Chat.css';

import { io } from 'socket.io-client';

let socket;

export default function Chat(props) {
  const { userInfo } = props;

  useEffect(() => {
    socket = io();

    socket.emit('joining msg', userInfo.name);
  
    socket.on('chat message', function(messageData) {
      console.log(messageData);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const sendMessage = (messageData) => {
    socket.emit('chat message', messageData);
  }

  return (
    <div className="chat-container">
      <div className="chat-top">
        <ChatLog />
        <MembersList />
      </div>
      <InputBox userInfo={userInfo} onSend={sendMessage} />
    </div>
  )
}