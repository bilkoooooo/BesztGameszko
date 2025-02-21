"use strict";

export const games = new Map();

class Game {
    _gameId = Math.floor(Math.random() * Date.now()).toString();

    static get(_gameId) {
        if (!games.has(_gameId)) {
            games.set(_gameId, new Game(_gameId));
            console.log(`created '${_gameId}' game`);
        }

        return games.get(_gameId);
    }

    constructor(room) {
        this.room = room;
        this.state = [['', '', ''], ['', '', ''], ['', '', '']];
        this.players = [...room.members];
        this.activePlayer = this.players[0].id;
        this.winner = null;
        this.gameId = this._gameId;
        this.steps = 0;
    }

    get playersInRoom() {
        return this.players.map(({name, color, id, symbol}) => ({name, color, id, symbol}));
    }

    getPlayerById = (id) => this.players.find((player) => player.id === id)

    setState = () => {}

    resetState = () => {
        this.state = [['', '', ''], ['', '', ''], ['', '', '']];
    }

    setActivePlayer = () => this.activePlayer = this.players.find((player) => player.id !== this.activePlayer).id

    onMove = (playerMove) => {
        this.setState(playerMove);
    }
}

export {Game as default};