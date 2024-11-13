import {createContext, useState} from "react";

export const ChatHistoryContext = createContext(null);
export const ChatHistoryProvider = ({children}) => {
  const [chatHistory, setChatHistory] = useState([]);

  return (
    <ChatHistoryContext.Provider value={{chatHistory, setChatHistory}}>
      {children}
    </ChatHistoryContext.Provider>
  );
}
