import {useContext, useState} from "react";
import JoinModalComponent from "@components/lobby/JoinModalComponent";
import WebSocketManager from "@/services/WebSocketManager";
import Chat from "@components/lobby/ChatComponent";
import {PlayerProvider} from "@/services/PlayerProvider";
import {WebsocketHistoryProvider} from "@/services/WebsocketHistoryProvider";
import {WebsocketContext, WebsocketProvider} from "@/services/WebsocketProvider";
import {GameProvider} from "@/services/GameProvider";
import GameComponent from "@components/game/GameComponent";
import {PlayerIcon} from "@components/player/PlayerIcon";

const Main = () => {
    const [isJoined, setIsJoined] = useState(false);
    return (
        <div className={"h-screen w-screen relative flex justify-items-start items-end  bg-gradient-to-b from-blue-400 to-blue-900"}>
            <PlayerProvider>
                {!isJoined &&
                    <JoinModalComponent setIsJoined={setIsJoined}/>
                }
                {isJoined &&
                    <>
                        <PlayerIcon/>
                        <WebsocketProvider>
                            <WebsocketHistoryProvider>
                                <WebSocketManager setIsJoined={setIsJoined}/>
                                <Chat/>
                                <GameProvider>
                                    <GameComponent/>
                                </GameProvider>
                            </WebsocketHistoryProvider>
                        </WebsocketProvider>
                    </>

                }
            </PlayerProvider>
        </div>
    )
}

export default Main;
