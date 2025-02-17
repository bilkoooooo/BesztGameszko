import {useContext, useState} from "react";
import JoinModalComponent from "@components/lobby/JoinModalComponent";
import WebSocketManager from "@/services/WebSocketManager";
import Chat from "@components/lobby/ChatComponent";
import {PlayerProvider} from "@/services/PlayerProvider";
import {WebsocketHistoryProvider} from "@/services/WebsocketHistoryProvider";
import {WebsocketContext, WebsocketProvider} from "@/services/WebsocketProvider";
import {GameProvider} from "@/services/GameProvider";
import GameComponent from "@components/game/GameComponent";

const Main = () => {
    const [isJoined, setIsJoined] = useState(false);
    const {webSocket} = useContext(WebsocketContext) || {};

    console.log(webSocket);
    return (
        <>
            <PlayerProvider>
                {!isJoined &&
                    <JoinModalComponent setIsJoined={setIsJoined}/>
                }
                {isJoined &&
                    <WebsocketProvider>
                        <WebsocketHistoryProvider>
                            <WebSocketManager setIsJoined={setIsJoined}/>
                            <Chat/>
                            <GameProvider>
                                <GameComponent/>
                            </GameProvider>
                        </WebsocketHistoryProvider>
                    </WebsocketProvider>
                }
            </PlayerProvider>
        </>
    )
}

export default Main;
