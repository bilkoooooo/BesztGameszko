export const useSendWebsocketMessage = (webSocket, data) => webSocket.send(JSON.stringify(data));
