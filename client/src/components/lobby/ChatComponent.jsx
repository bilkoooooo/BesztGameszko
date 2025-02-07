import {useContext, useEffect} from "react";
import ChatInputComponent from "@components/lobby/ChatInputComponent";
import {PlayerContext} from "@/services/PlayerProvider";
import {WebsocketHistoryContext} from "@/services/WebsocketHistoryProvider";
import {WebsocketContext} from "@/services/WebsocketProvider";

const ChatComponent = () => {
    const {player} = useContext(PlayerContext);
    const {websocketHistory: {chat = []}} = useContext(WebsocketHistoryContext);

    const chatDiv = ({player, children}) => {
        const {id, color, name} = player;
        return (
            <div id={id} style={{color}} className="flex py-2 px-4 bg-white rounded gap-0.5 max-w-3xl">
                <span className="font-bold">{name}</span>
                {children}
            </div>
        )
    }

    const showChat = (msg) => {
        const {type, player} = msg;
        switch (type) {
            case 'chat':
                return chatDiv({
                    player,
                    children: <>: <span>{msg.text}</span></>
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
                return (<span>{msg.text}</span>);
        }
    }

    useEffect(() => {
        console.log(chat);
    }, [chat]);

    return (
        <div
            className="h-screen flex flex-col justify-end gap-5 p-8 bg-white bg-opacity-20 backdrop-blur-lg overflow-y-clip px-5 basis-3/12">
            <div className="flex flex-shrink-0 flex-col gap-5 overflow-y-auto max-h-fit flex-1">
                {chat.map((msg, index) => <div key={index}>{showChat(msg, index)}</div>)}
            </div>
            <div className="flex">
                <ChatInputComponent player={player}/>
            </div>
        </div>
    )
}

export default ChatComponent;
