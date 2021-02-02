import React from 'react';
import classNames from 'classnames';

export default function ChatLogItem(props) {
  const { userId, avatar, senderId, sender, message, time_locale } = props;

  const chatItemClass = classNames("chat-item", { "own-message": userId === senderId});

  return (
    <div className={chatItemClass}>
      <img className="chat-avatar" alt="Employee Avatar" src={avatar}></img>
      <div className="chat-item-right">
        <div className="chat-message-sender">{sender}</div>
        <div className="chat-message">{message}</div>
        <span className="chat-message-time">{time_locale}</span>
      </div>
    </div>
  )
}