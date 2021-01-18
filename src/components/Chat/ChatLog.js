import React from 'react';

import ChatLogItem from "./ChatLogItem";

const messages = [
  {
    id: 1,
    sender_id: 2,
    team_id: 1,
    send_time: "2021-01-05T21:11:12.000Z",
    message: "Whats poppin",
    time_sent: "Jan 05, 2021 at 1:11pm",
    name: "Shaun Yap"
  },
  {
    id: 4,
    sender_id: 2,
    team_id: 1,
    send_time: "2021-01-05T21:11:12.000Z",
    message: "Whats poppin",
    time_sent: "Jan 05, 2021 at 1:11pm",
    name: "Shaun Yap"
  },
  {
    id: 2,
    sender_id: 1,
    team_id: 1,
    send_time: "2021-01-05T22:56:12.000Z",
    message: "Stop slacking and get back to work!",
    time_sent: "Jan 05, 2021 at 2:56pm",
    name: "Andy Lindsay"
  },
  {
    id: 3,
    sender_id: 3,
    team_id: 1,
    send_time: "2021-01-05T23:01:32.000Z",
    message: "Oh shit, big boss is here",
    time_sent: "Jan 05, 2021 at 3:01pm",
    name: "Kevin Li"
  }
];

export default function Chat(props) {
  const messageComponents = messages.map(message => {
    const {id, time_sent, message: messageStr, name} = message;
    return (
      <ChatLogItem 
        key={id}
        avatar="https://randomuser.me/api/portraits/men/73.jpg"
        sender={name} 
        message={messageStr}
        time_sent={time_sent}
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