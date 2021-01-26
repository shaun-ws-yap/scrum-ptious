import React, {Fragment} from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import "../styles/Chat.css";

import ChatLogItem from "../components/Chat/ChatLogItem";

export default { title: "Chat"}

const props = { 
  avatar: "https://i.pravatar.cc/300",
  sender: "Andy Lindsay",
  message: "Hello there",
  time_locale: "Jan 5, 2021 at 5:11 AM",
};

export const receivedMessage = () => {
  const { avatar, sender, message, time_locale } = props;

  return (
    <ChatLogItem 
      userId={1}
      key={1}
      senderId={2}
      avatar={avatar}
      sender={sender} 
      message={message}
      time_locale={time_locale}
  />)
}
