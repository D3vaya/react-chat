import React, { createContext, useReducer } from "react";
import { chatReducer } from "./chatReducer";

export const ChatContext = createContext();

const initialState = {
  uid: "",
  chatActive: null, // uid al usuario a enviar mensajes
  users: [], // users bd
  messages: [], // mensajes del chat seleccionado
};
export const ChatProvider = ({ children }) => {
  const [chatState, dispatch] = useReducer(chatReducer, initialState);

  return (
    <ChatContext.Provider value={{ chatState, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
