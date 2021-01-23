import { React } from 'react';

import ChatLog from "./ChatLog";
import MembersList from "./MembersList";
import InputBox from "./InputBox";
import ScrollToBottom from 'react-scroll-to-bottom';

import '../../styles/Chat.css';

import useChat from '../../hooks/useChat';

export default function Chat(props) {
  const { socket, userInfo, teamUsers } = props

  const { 
    messages, 
    joinMessage, 
    onlineUsers, 
    getPrevMessages, 
    sendMessage,
  } = useChat(socket, userInfo);

  return (
    <div className="chat-container">
      <button onClick={()=> getPrevMessages()}>Test Get Previous Messages</button>
      <div className="chat-top">
        <ScrollToBottom className="chat-scroll">
          <ChatLog 
            messages={messages} 
            chatInfo={joinMessage} 
            getPrevMessages={getPrevMessages}
          />
        </ScrollToBottom>
        <MembersList teamUsers={teamUsers} onlineUsers={onlineUsers} />
      </div>
      <InputBox sendMessage={sendMessage} />
    </div>
  )
};