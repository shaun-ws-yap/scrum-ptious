import { React } from 'react';

import ChatLog from "./ChatLog";
import MembersList from "./MembersList";
import InputBox from "./InputBox";
import ScrollToBottom from 'react-scroll-to-bottom';

import '../../styles/Chat.css';

import useChat from '../../hooks/useChat';

export default function Chat(props) {
  const { socket, userInfo, teamUsers, messages, setMessages } = props

  const { 
    //messages, 
    joinMessage, 
    onlineUsers, 
    getPrevMessages, 
    sendMessage,
  } = useChat(socket, userInfo, messages, setMessages);

  return (
    <div className="chat-container">
      <div className="chat-left">
        <ScrollToBottom className="chat-log-container">
          <ChatLog 
            userId={userInfo.id}
            messages={messages} 
            chatInfo={joinMessage} 
            getPrevMessages={getPrevMessages}
            teamUsers={teamUsers}
          />
        </ScrollToBottom>
        <InputBox sendMessage={sendMessage} />
      </div>
      <MembersList teamUsers={teamUsers} onlineUsers={onlineUsers} />
    </div>
  )
};