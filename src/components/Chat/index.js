import { React, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

import ChatLog from "./ChatLog";
import MembersList from "./MembersList";
import InputBox from "./InputBox";

import '../../styles/Chat.css';

import formatDateString from '../../utilities/format-date'

let socket;

const dummyMsgs = [
  {
    sender_id: 2,
    sender: "Shaun Yap",
    message: "Whats poppin",
    time_iso: "2021-01-05T21:11:12.000Z",
    time_locale: "Jan 5, 2021 at 1:11 PM"
  },
  {
    sender_id: 1,
    sender: "Andy Lindsay",
    message: "Stop slacking and get back to work!",
    time_iso: "2021-01-05T22:56:12.000Z",
    time_locale: "Jan 5, 2021 at 2:56 PM"
  },
  {
    sender_id: 3,
    sender: "Kevin Li",
    message: "Oh shit, big boss is here",
    time_iso: "2021-01-05T23:01:32.000Z",
    time_locale: "Jan 5, 2021 at 3:01 PM"
  }
];

export default function Chat(props) {
  const { userInfo } = props;
  const { id, name } = userInfo;

  const [messages, setMessages] = useState(dummyMsgs);

  useEffect(() => {
    socket = io();

    socket.emit('joining msg', name);
  
    socket.on('chat message', function(messageData) {
      setMessages(prev => [...prev, messageData])
      console.log(messageData);
    });

    return () => {
      socket.off('chat message');
      socket.emit('leaving msg', name);
      socket.close(); // TODO: need to ask mentor about this and useRef
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessage = (message) => {
    const now = new Date();
    const messageData = {
      message,
      sender_id: id,
      sender: name,
      time_iso: now.toISOString(),
      time_locale: formatDateString(now),
    }
    socket.emit('chat message', messageData);
  }

  return (
    <div className="chat-container">
      <div className="chat-top">
        <ChatLog messages={messages}/>
        <MembersList />
      </div>
      <InputBox userInfo={userInfo} sendMessage={sendMessage} />
    </div>
  )
};