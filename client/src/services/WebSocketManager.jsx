import React, {useContext, useEffect, useState} from 'react';
import {PlayerContext} from "@/services/PlayerProvider";
import {WebsocketHistoryContext} from "@/services/WebsocketHistoryProvider";
import {WebsocketContext} from "@/services/WebsocketProvider";
import {useSendWebsocketMessage} from "@/services/SendWebsocketMessage";

const WebSocketManagerComponent = ({setIsJoined}) => {
    const [socketUrl, setSocketUrl] = useState('ws://localhost:3001/game/bilkoo');
    const [connectionStatus, setConnectionStatus] = useState('Connecting');
    const {player, dispatch} = useContext(PlayerContext);
    const {websocketHistory: {join}, setWebsocketHistory} = useContext(WebsocketHistoryContext);
    const {setWebSocket} = useContext(WebsocketContext);

    useEffect(() => {
        const ws = new WebSocket(socketUrl);

        ws.onopen = () => {
            setConnectionStatus('Open');
            useSendWebsocketMessage(ws, {player, type: 'join'})
        };

        ws.onclose = () => {
            dispatch({name: 'id', value: null});
            setConnectionStatus('Closed')
        };

        ws.onmessage = (event) => setWebsocketHistory(JSON.parse(event.data));

        setWebSocket(ws);
    }, []);


    useEffect(() => {
        !!join.length && !player.id && dispatch({
            name: 'id',
            value: join.at(-1).player.id
        })
    }, [join]);

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
