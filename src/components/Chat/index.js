import React from 'react';

import ChatLog from "./ChatLog";
import MembersList from "./MembersList";
import InputBox from "./InputBox";

import '../../styles/Chat.css';

export default function Chat() {
  return (
    <div className="chat-container">
      <div className="chat-top">
        <ChatLog />
        <MembersList />
      </div>
      <InputBox />
    </div>
  )
}