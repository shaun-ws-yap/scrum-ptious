import { React, useEffect } from 'react';

import ChatLog from "./ChatLog";
import MembersList from "./MembersList";
import InputBox from "./InputBox";

import '../../styles/Chat.css';

import { io } from 'socket.io-client';


export default function Chat(props) {
  const { userInfo } = props;
  const socket = io();

  const sendMessage = (messageData) => {
    socket.emit('chat message', messageData);
  }

  socket.emit('joining msg', userInfo.name);

  socket.on('chat message', function(msg) {
    console.log(msg);
  });

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