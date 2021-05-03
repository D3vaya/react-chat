import React, { useContext } from "react";

import { SidebarChatItem } from "./SidebarChatItem";
import { ChatContext } from "../context/chat/ChatContext";
import { AuthContext } from "../auth/AuthContext";

export const Sidebar = () => {
  const { chatState } = useContext(ChatContext);

  const { auth } = useContext(AuthContext);

  return (
    <div className="inbox_chat">
      {chatState.users
        // REFACTOR  cambio uid por email, ya que debo solucionar el bug del backend
        .filter((user) => user.email !== auth.email)
        .map((user) => (
          <SidebarChatItem key={user._id} user={user} />
        ))}

      <div className="extra_space"></div>
    </div>
  );
};
