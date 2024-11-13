import PlayerInputComponent from "@ui/PlayerInputComponent";
import {User} from "lucide-react";

const ChatInputComponent = ({player, webSocket}) => {
  let msg = '';
  const type = (event) => {
    msg = event.target.value;
    if (event.key === "Enter" && msg) {
      webSocket?.send(JSON.stringify({player, type: 'chat', text: msg}));
      event.target.value = '';
    }
  }
  return <div className="bg-white px-4 pb-4 pt-5 rounded flex-1">
    {PlayerInputComponent({
      inputType: 'text',
      inputName: 'playerChat',
      inputLabel: 'Mondj valamit..',
      inputPlaceholder: 'Mondj valamit..',
      InputIcon: player.icon ?? User,
      inputValue: '',
      inputStyle: {style: {outline: 0, color: player.color ?? '#000000'}},
      dispatch: () => {},
      player,
      other: {onKeyDown: (event) => type(event)}
    })}
  </div>
}

export default ChatInputComponent;
