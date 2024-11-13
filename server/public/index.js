const joinBtn = document.querySelector('#join')
const playersDiv = document.querySelector('.players');
const playerNameInput = document.querySelector('#playerName');
const playerColorInput = document.querySelector('#playerColor');
const joinContainer = document.querySelector('#joinContainer');
const chatContainer = document.querySelector('.chat');
const chatInput = document.querySelector('#chatInput');
const gameContainer = document.getElementById('game-container');
let webSocket = null;
const player = {name: null, color: '#fff00f', symbol: 'x'};

const urlParts = document.URL.split("/");

const clickHandler = ({target}) => {
  if (target.matches('#join')) {
    onJoin();
  }
}

document.addEventListener('click', clickHandler);

const onJoin = () => {
  try {
    webSocket = new WebSocket(`ws://${location.host}/game/bilkoo`);
  } catch (e) {
    console.log(e);
  }

  player.name = playerNameInput.value + Math.floor(Math.random() * 999) ?? 'Bilkoo';
  player.color = playerColorInput.value;

  webSocket.onopen = () => {
    joinContainer.classList.add('hidden');
    chatInput.classList.remove('hidden');
    webSocket.send(JSON.stringify({player, type: 'join'}));
  };

  webSocket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    const {type, player = {}} = data;
    console.log(type, player);

    if (type === 'note') {
      playersDiv.append(createPlayerDiv(player));
    }

    if (type === 'chat') {
      chatContainer.append(createChatMessageDiv(player, data.text))
    }

    if (type === 'game_created') {
      gameContainer.append(createGameBoard());
    }
  }

  webSocket.onclose = () => webSocket.send(JSON.stringify({player, type: 'close'}));

}


const createPlayerDiv = ({name, color}) => {
  const div = document.createElement('div');
  div.textContent = `joined.`;
  div.style.color = color;

  return div;
}


const createChatMessageDiv = ({name, color}, text) => {
  const div = document.createElement('div');
  div.textContent = `${name}:  ${text}`;
  div.style.color = color;

  return div;
}

createGameBoard = () => {
  const boardDiv = document.createElement('div');

  let col = 0;
  for (let i = 0; i < 9; i++) {
    if (col > 2) {
      col = 0;
    }
    const clone = document.createElement('div');

    clone.dataset.row = Math.floor(i / 3).toString();
    clone.dataset.col = col.toString();
    col++;
    boardDiv.append(clone);
  }

  return boardDiv;
}
