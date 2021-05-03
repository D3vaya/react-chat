import React, { useContext } from "react";
import { ChatContext } from "../context/chat/ChatContext";
import { chatTypes } from "../types/chatTypes";

export const SidebarChatItem = ({ user }) => {
  const { name, online } = user;
  const { chatState, dispatch } = useContext(ChatContext);

  const handleClick = () => {
    dispatch({
      type: chatTypes.activeChat,
      payload: user._id,
    });
  };
  return (
    // active_chat
    <div
      className={`chat_list ${
        user._id === chatState.chatActive && "active_chat"
      } `}
      onClick={handleClick}
    >
      <div className="chat_people">
        <div className="chat_img">
          <img
            src="https://ptetutorials.com/images/user-profile.png"
            alt="sunil"
          />
        </div>
        <div className="chat_ib">
          <h5>{name}</h5>
          {online ? (
            <span className="text-success">Online</span>
          ) : (
            <span className="text-danger">Offline</span>
          )}
        </div>
      </div>
    </div>
  );
};
