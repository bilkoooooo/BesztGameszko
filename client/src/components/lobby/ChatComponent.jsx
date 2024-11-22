import {useContext, useEffect} from "react";
import ChatInputComponent from "@components/lobby/ChatInputComponent";
import {PlayerContext} from "@/services/PlayerProvider";
import {ChatHistoryContext} from "@/services/ChatHistoryProvider";
import {WebsocketContext} from "@/services/WebsocketProvider";

const ChatComponent = () => {
  const {player} = useContext(PlayerContext);
  const {chatHistory} = useContext(ChatHistoryContext);
  const {webSocket} = useContext(WebsocketContext);

  const chatDiv = ({player, children}) => {
    const {id, color, name} = player;
    return (
      <div id={id} style={{color}} className="flex py-2 px-4 bg-white rounded gap-1 max-w-3xl">
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
          children: <>:<span>{msg.text}</span></>
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
    console.log(chatHistory);
  }, [chatHistory]);

  return (
    <div className="max-h-screen h-screen flex flex-col gap-5 p-8 bg-white bg-opacity-20 backdrop-blur-lg justify-end overflow-y-clip px-5">
      <div className="flex flex-shrink-0 flex-col gap-5 overflow-y-auto max-h-fit basis-4/5">
        {chatHistory.filter(({type}) => type !== 'move').map((msg, index) => <div key={index} className={"asd"}>{showChat(msg, index)}</div>)}
      </div>
      <div className="flex">
        <ChatInputComponent player={player} webSocket={webSocket}/>
      </div>
    </div>
  )
}

export default ChatComponent;
