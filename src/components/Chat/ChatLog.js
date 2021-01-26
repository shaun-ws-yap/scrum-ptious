import { React, useCallback, useState, useEffect, useRef } from 'react';
import { useObserveScrollPosition } from 'react-scroll-to-bottom';

import ChatLogItem from "./ChatLogItem";
import getUserById from '../../helpers/getUserById';

export default function ChatLog(props) {
  const { userId, messages, chatInfo, getPrevMessages, teamUsers } = props;

  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(1);
  const loader = useRef(null);
  const container = useRef(null);
  // here we handle what happens when user scrolls to Load More div
  // in this case we just update page variable
  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {   
      setPage((page) => page + 1)
    }
  }

  useEffect(() => {
    var options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0
    };
    // initialize IntersectionObserve and attaching to Load More div
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current)
    }
  }, []);

  useEffect(() => {
    getPrevMessages();
  }, [page]);

  useEffect(() => {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 2000);
  }, [chatInfo])

  const messageComponents = messages.map((messageData, index) => {
    const { sender, message, sender_id, time_iso, time_locale } = messageData;
    return (
      <ChatLogItem 
        userId={userId}
        key={`${sender_id}: ${time_iso}`}
        avatar={getUserById(teamUsers, sender_id).avatar}
        sender={sender} 
        senderId={sender_id}
        message={message}
        time_locale={time_locale}
      />
    )
  })

  return (
    <div className="chat-log" ref={container}>
      <div className="loading" ref={loader}></div>
      {messageComponents}
      { visible && 
        <div className="chat-log-bottom">
          <span className="clat=info">
            {chatInfo}
          </span>
        </div>
      }
    </div>
  )
}