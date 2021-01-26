import { useState, useEffect } from 'react';
import axios from "axios";

import formatDateString from "../utilities/format-date";

const MESSAGES_URL = "http://localhost:8080/api/messages";

export default function useChat(socket, userInfo) {
  const { id, name, team_id } = userInfo;

  const [ messages, setMessages ] = useState([]);
  const [ onlineUsers, setOnlineUsers ] = useState([]);
  const [ joinMessage, setJoinMessage ] = useState("");

  // useEffect(() => {
  //   axios.get(`${MESSAGES_URL}/15`)
  //   .then(res => setMessages(res.data));
  // }, []);

  useEffect(() => {
    //socket = io();

    socket.emit('joining msg', name, id);

    socket.on('user joined', (users, username, messages) => {
      setOnlineUsers(users);
      setJoinMessage(username + " joined the chat")
      setMessages(messages);
    });

    socket.on('user left', (users, username) => {
      setOnlineUsers(users);
      setJoinMessage(username + " left the chat")
    });
  
    socket.on('chat message', function(messageData) {
      setMessages(prev => [...prev, messageData])
    });

    socket.on('get previous messages', messagesData => {
      setMessages(prev => [...messagesData, ...prev]);
      console.log(messagesData);
    });

    socket.on('message saved', function(messageData) {
      console.log('message saved: ', messageData);
    });

    return () => {
      socket.off('user joined');
      socket.off('user left');
      socket.off('chat message');
      socket.off('get previous messages');
      socket.off('message saved');
      socket.emit('leaving msg', name, id );
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPrevMessages = () => {
    if (messages[0]) {
      socket.emit('get previous messages', messages[0].time_iso, 12);
    }
  }

  const sendMessage = message => {
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
  };

  return { 
    messages, 
    joinMessage, 
    onlineUsers, 
    getPrevMessages, 
    sendMessage,
  };
}