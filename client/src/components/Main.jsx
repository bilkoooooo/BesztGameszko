import {useState} from "react";
import JoinModalComponent from "@components/lobby/JoinModalComponent";
import WebSocketManager from "@/services/WebSocketManager";
import Chat from "@components/lobby/ChatComponent";
import {PlayerProvider} from "@/services/PlayerProvider";
import {ChatHistoryProvider} from "@/services/ChatHistoryProvider";
import {WebsocketProvider} from "@/services/WebsocketProvider";
import {GameProvider} from "@/services/GameProvider";
import GameComponent from "@components/game/GameComponent";

const Main = () => {
  const [isJoined, setIsJoined] = useState(false);

  return (
    <>
      <PlayerProvider>
        {!isJoined &&
          <JoinModalComponent setIsJoined={setIsJoined}/>
        }
        {isJoined &&
          <WebsocketProvider>
            <ChatHistoryProvider>
              <WebSocketManager setIsJoined={setIsJoined}/>
              <Chat/>
              <GameProvider>
                <GameComponent/>
              </GameProvider>
            </ChatHistoryProvider>
          </WebsocketProvider>
        }
      </PlayerProvider>
    </>
  )
}

export default Main;
