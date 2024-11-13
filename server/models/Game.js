"use strict";

export const games = new Map();

const winningCombinations = [
  [[0, 0], [0, 1], [0, 2]], // Row 1
  [[1, 0], [1, 1], [1, 2]], // Row 2
  [[2, 0], [2, 1], [2, 2]], // Row 3
  [[0, 0], [1, 0], [2, 0]], // Column 1
  [[0, 1], [1, 1], [2, 1]], // Column 2
  [[0, 2], [1, 2], [2, 2]], // Column 3
  [[0, 0], [1, 1], [2, 2]], // Diagonal 1
  [[0, 2], [1, 1], [2, 0]]  // Diagonal 2
];

export default class Game {
  _gameId = Math.floor(Math.random() * Date.now()).toString();

  static get(_gameId) {
    if (!games.has(_gameId)) {
      games.set(_gameId, new Game(_gameId));
      console.log(`created '${_gameId}' game`);
    }

    return games.get(_gameId);
  }

  constructor(players) {
    this.state = [['', '', ''], ['', '', ''], ['', '', '']];
    this.players = [...players];
    this.activePlayer = this.players[0].id;
    this.winner = null;
    this.gameId = this._gameId;
  }

  checkWin = () => {
    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (
        this.state[a[0]][a[1]] &&
        this.state[a[0]][a[1]] === this.state[b[0]][b[1]] &&
        this.state[a[0]][a[1]] === this.state[c[0]][c[1]]) {
        return true; // We have a winner
      }
    }
    return false; // No winner yet
  }

  get playersInRoom() {
    return this.players.map(({name, color, id, symbol}) => ({name, color, id, symbol}));
  }

  getPlayerById = (id) => this.players.find((player) => player.id === id)

  setState = ({cell}) => {
    const [col, row] = cell.split('_');

    this.state[row][col] = this.getPlayerById(this.activePlayer).symbol;

    if (this.checkWin()) {
      this.winner = this.activePlayer;
    }
    this.setActivePlayer();
  }

  setActivePlayer = () => this.activePlayer = this.players.find((player) => player.id !== this.activePlayer).id

  onMove = (playerMove) => {
    this.setState(playerMove);
  }

}
