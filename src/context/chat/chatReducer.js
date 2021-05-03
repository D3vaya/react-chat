import { chatTypes } from "../../types/chatTypes";

export const chatReducer = (state, action) => {
  switch (action.type) {
    case chatTypes.usersLoaded:
      return {
        ...state,
        users: [...action.payload],
      };
    case chatTypes.activeChat:
      if (state.activeChat === action.payload) return state;
      return {
        ...state,
        chatActive: action.payload,
        messages: [],
      };
    default:
      return state;
  }
};
