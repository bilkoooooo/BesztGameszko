import React, {useContext, useEffect, useState} from 'react';
import {PlayerContext} from "@/services/PlayerProvider";
import {ChatHistoryContext} from "@/services/ChatHistoryProvider";
import {WebsocketContext} from "@/services/WebsocketProvider";

const WebSocketManagerComponent = ({setIsJoined}) => {
  const [socketUrl, setSocketUrl] = useState(`ws://192.168.51.223:3000/game/bilkoo`);
  const [connectionStatus, setConnectionStatus] = useState('Connecting');
  const {player, dispatch} = useContext(PlayerContext);
  const {chatHistory, setChatHistory} = useContext(ChatHistoryContext);
  const {setWebSocket} = useContext(WebsocketContext);

  useEffect(() => {
    const ws = new WebSocket(socketUrl);

    ws.onopen = () => {
      setConnectionStatus('Open');
      ws.send(JSON.stringify({player, type: 'join'}));
    };

    ws.onclose = () => setConnectionStatus('Closed');

    ws.onmessage = (event) => setChatHistory((prevHistory) => [...prevHistory, JSON.parse(event.data)]);

    setWebSocket(ws);
  }, []);


  useEffect(() => {
    chatHistory.length && !player.id && dispatch({
      name: 'id',
      value: chatHistory.findLast((msg) => msg.type === 'join')?.player.id
    })
  }, [chatHistory]);

  useEffect(() => {
    console.log(connectionStatus);

    if (connectionStatus === 'Closed') {
      // location.reload();
      setIsJoined(false);
    }
  }, [connectionStatus]);

  return (
    <div className="absolute top-0 left-0 transition delay-1000 -translate-x-full">
      <p>WebSocket connection status: {connectionStatus}</p>
    </div>
  );
};

export default WebSocketManagerComponent;
