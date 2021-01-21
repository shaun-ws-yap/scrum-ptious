import { React, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import axios from "axios";

import ChatLog from "./ChatLog";
import MembersList from "./MembersList";
import InputBox from "./InputBox";

import '../../styles/Chat.css';

import formatDateString from "../../utilities/format-date";

const MESSAGES_URL = "http://localhost:8080/api/messages/10";

let socket;

export default function Chat(props) {
  const { id, name, team_id } = props.userInfo;

  const [ messages, setMessages ] = useState([]);
  const [ onlineUsers, setOnlineUsers ] = useState([]);
  const [ joinMessage, setJoinMessage ] = useState("");

  useEffect(() => {
    axios.get(MESSAGES_URL)
    .then(messages => setMessages(messages.data));
  }, []);

  useEffect(() => {
    socket = io();

    socket.emit('joining msg', name, id);

    socket.on('user joined', (users, username) => {
      setOnlineUsers(users);
      setJoinMessage(username + " joined the chat")
      console.log(users);
    });

    socket.on('user left', (users, username) => {
      setOnlineUsers(users);
      setJoinMessage(username + " left the chat")
      console.log(users);
    });
  
    socket.on('chat message', function(messageData) {
      setMessages(prev => [...prev, messageData])
    });

    socket.on('message saved', function(messageData) {
      console.log('message saved: ', messageData);
    });

    socket.on('error', function(error) {
      console.log('error saving message: ', error);
    })

    return () => {
      socket.off('user joined');
      socket.off('user left');
      socket.off('chat message');
      socket.off('message saved');
      socket.off('error');
      socket.emit('leaving msg', name, id );
      socket.close(); // TODO: need to ask mentor about this and useRef
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessage = (message) => {
    const now = new Date();
    const messageData = {
      message,
      team_id,
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
        <ChatLog messages={messages} chatInfo={joinMessage}/>
        <MembersList teamUsers={props.teamUsers} onlineUsers={onlineUsers} />
      </div>
      <InputBox sendMessage={sendMessage} />
    </div>
  )
};