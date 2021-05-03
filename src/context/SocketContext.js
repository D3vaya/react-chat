import React, { useContext, useEffect } from "react";
import { createContext } from "react";

import { ChatContext } from "./chat/ChatContext";
import { AuthContext } from "../auth/AuthContext";

import { useSocket } from "../hooks/useSocket";
import { chatTypes } from "../types/chatTypes";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { socket, online, connectSocket, disconnectSocket } = useSocket(
    "http://localhost:8080"
  );
  const { auth } = useContext(AuthContext);

  const { dispatch } = useContext(ChatContext);

  // NOTE conectar el socket
  useEffect(() => {
    if (auth.logged) {
      connectSocket();
    }
  }, [auth, connectSocket]);
  // NOTE desconectar el socket
  useEffect(() => {
    if (!auth.logged) {
      disconnectSocket();
    }
  }, [auth, disconnectSocket]);

  useEffect(() => {
    socket?.on("list-users", (users) => {
      console.log("users => ", users);
      dispatch({
        type: chatTypes.usersLoaded,
        payload: users,
      });
    });
  }, [socket, dispatch]);
  return (
    <SocketContext.Provider value={{ socket, online }}>
      {children}
    </SocketContext.Provider>
  );
};
