import {useContext, useEffect} from "react";
import ChatInputComponent from "@components/lobby/ChatInputComponent";
import {PlayerContext} from "@/services/PlayerProvider";
import {WebsocketHistoryContext} from "@/services/WebsocketHistoryProvider";
import {WebsocketContext} from "@/services/WebsocketProvider";

const ChatComponent = () => {
    const {player} = useContext(PlayerContext);
    const {websocketHistory: {chat = [], join = []}} = useContext(WebsocketHistoryContext);

    const chatDiv = ({player, children}) => {
        const {id, color, name} = player;
        return (
            <div id={id} style={{color}} className="flex py-2 px-4 bg-white rounded gap-0.5 max-w-3xl">
                <span className="font-bold">{name}</span>
                {children}
            </div>
        )
    }

    const showChat = (type = 'chat', {player, text, timestamp}) => {
        switch (type) {
            case 'chat':
                return chatDiv({
                    player,
                    children: <>: <span title={timestamp}>{text}</span></>
                });
            case 'join':
                return chatDiv({
                    player,
                    children: <span>joined.</span>
                });
            case 'left':
                location.reload();

                return chatDiv({
                    player,
                    children: <span>left.</span>
                });
            case 'game_created':
                return (<span>{text}</span>);
        }
    }

    return (
        <div
            className="h-screen z-40 flex flex-col justify-end gap-5 p-8 bg-white bg-opacity-20 backdrop-blur-lg overflow-y-clip px-5 basis-4/12">
            <div className="flex flex-shrink-0 flex-col gap-5 overflow-y-auto max-h-fit flex-1">
                {chat.map((data, index) => <div key={index}>{showChat('chat', data)}</div>)}

                <div id="join-message" className="transition-opacity duration-1000 opacity-100">
                    {join.length && showChat('join', join.at(-1))}
                </div>

            </div>
            <div className="flex">
                <ChatInputComponent player={player}/>
            </div>
        </div>
    )
}

export default ChatComponent;
