import React from 'react';

import ChatLogItem from "./ChatLogItem";

export default function ChatLog(props) {
  const { messages } = props;
  const messageComponents = messages.map(messageData => {
    const { sender, message, sender_id, time_iso, time_locale } = messageData;
    return (
      <ChatLogItem 
        key={`${sender_id}: ${time_iso}`}
        avatar="https://randomuser.me/api/portraits/men/73.jpg"
        sender={sender} 
        message={message}
        time_locale={time_locale}
      />
    )
  })
  return (
    <div className="chat-log">
      <h2>Chat Log</h2>
      {messageComponents}
    </div>
  )
}