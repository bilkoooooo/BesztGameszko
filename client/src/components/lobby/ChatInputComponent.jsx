import Textarea02 from "@ui/textareas/textarea-02";
import {useSendWebsocketMessage} from "@/services/SendWebsocketMessage";
import {useContext} from "react";
import {WebsocketContext} from "@/services/WebsocketProvider";

const ChatInputComponent = ({player}) => {
    const {webSocket} = useContext(WebsocketContext);

    let msg = '';
    const type = (event) => {
        msg = event.target.value;
        if (event.key === "Enter" && msg.trim()) {
            useSendWebsocketMessage(webSocket, {player, type: 'chat', text: msg});
            event.target.value = '';
            event.preventDefault();
        }
    }
    return <div className="bg-white px-4 pb-4 pt-5 rounded flex-1 basis-1/5">
        <Textarea02 onInput={(e) => type(e)}/>
    </div>
}

export default ChatInputComponent;
