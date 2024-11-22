import Textarea02 from "@ui/textareas/textarea-02";

const ChatInputComponent = ({player, webSocket}) => {
  let msg = '';
  const type = (event) => {
    msg = event.target.value;
    if (event.key === "Enter" && msg.trim()) {
      webSocket?.send(JSON.stringify({player, type: 'chat', text: msg}));
      event.target.value = '';
      event.preventDefault();
    }
  }
  return <div className="bg-white px-4 pb-4 pt-5 rounded flex-1 basis-1/5">
    <Textarea02 onInput={(e) => type(e)}/>
  </div>
}

export default ChatInputComponent;
