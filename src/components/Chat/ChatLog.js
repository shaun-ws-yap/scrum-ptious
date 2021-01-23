import { React, useCallback, useState, useEffect, useRef } from 'react';
import { useObserveScrollPosition } from 'react-scroll-to-bottom';

import ChatLogItem from "./ChatLogItem";

export default function ChatLog(props) {
  const { messages, chatInfo, getPrevMessages } = props;

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

  // const observer = useCallback(({ scrollTop }) => {
  //   console.log(scrollTop);
  //   if (scrollTop < 60 ) {
  //     setPage(prev => prev + 1);
  //   }
  // }, []);

  // useObserveScrollPosition(observer);

  useEffect(() => {
    getPrevMessages();
  }, [page]);

  const messageComponents = messages.map((messageData, index) => {
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
    <div className="chat-log" ref={container}>
      <div className="loading" ref={loader}></div>
      {messageComponents}
      <div className="chat-log-bottom">
        <span className="clat=info">
          {chatInfo}
        </span>
      </div>
    </div>
  )
}