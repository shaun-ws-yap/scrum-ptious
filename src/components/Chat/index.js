import { React, useEffect } from 'react';

import ChatLog from "./ChatLog";
import MembersList from "./MembersList";
import InputBox from "./InputBox";

import '../../styles/Chat.css';

import { io } from 'socket.io-client';

const name = 'User'

export default function Chat() {
  const socket = io();

  const sendMessage = (message) => {
    socket.emit('chat message', message);
  }

  socket.emit('joining msg', name);

  socket.on('chat message', function(msg) {
    console.log(msg);
  });

  return (
    <div className="chat-container">
      <div className="chat-top">
        <ChatLog />
        <MembersList />
      </div>
      <InputBox onSend={sendMessage} />
    </div>
  )
}