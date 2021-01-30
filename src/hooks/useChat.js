import { useState, useEffect } from 'react';

import formatDateString from "../utilities/format-date";

export default function useChat(socket, userInfo, messages, setMessages) {
  const { id, name, team_id } = userInfo;

  //const [ messages, setMessages ] = useState([]);
  const [ onlineUsers, setOnlineUsers ] = useState([]);
  const [ joinMessage, setJoinMessage ] = useState("");

  const getLastMessageTime = (messages) => {
    const lastMsg = messages[messages.length -1];
    return lastMsg ? lastMsg.time_iso : 0;
  }

  useEffect(() => {
    //socket = io();

    socket.emit('joining msg', name, id, getLastMessageTime(messages));

    socket.on('user joined', (users, username, messagesData) => {
      setOnlineUsers(users);
      setJoinMessage(username + " joined the chat")
      if (messagesData.length) {
        setMessages(messagesData, true);
      } 
    });

    socket.on('user left', (users, username) => {
      setOnlineUsers(users);
      setJoinMessage(username + " left the chat")
    });
  
    socket.on('chat message', function(messageData) {
      setMessages([messageData], true);
    });

    socket.on('get previous messages', messagesData => {
      setMessages(messagesData, false);
    });

    socket.on('message saved', function(messageData) {
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