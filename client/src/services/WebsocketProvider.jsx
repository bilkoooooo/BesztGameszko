import {createContext, useState} from "react";

export const WebsocketContext = createContext(null);
export const WebsocketProvider = ({children}) => {
  const [webSocket, setWebSocket] = useState(null);

  return (
    <WebsocketContext.Provider value={{webSocket, setWebSocket}}>
      {children}
    </WebsocketContext.Provider>
  );
}
