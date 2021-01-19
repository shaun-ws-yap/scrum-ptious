import { React, useEffect } from 'react';

import ChatLog from "./ChatLog";
import MembersList from "./MembersList";
import InputBox from "./InputBox";

import '../../styles/Chat.css';

import { io } from 'socket.io-client';
let socket;

export default function Chat(props) {
  const { userInfo } = props;
  const { name } = userInfo;

  useEffect(() => {
    socket = io();

    socket.emit('joining msg', name);
  
    socket.on('chat message', function(messageData) {
      console.log(messageData);
    });

    return () => {
      socket.off('chat message');
      socket.emit('leaving msg', name);
    };
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
};