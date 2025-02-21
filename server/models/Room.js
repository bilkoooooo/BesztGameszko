"use strict";

/** Chat rooms that can be joined/left/broadcast to. */

import VoteManager from "../utils/VoteManager.js";
import SuperTicTacToe from "./games/SuperTicTacToe.js";
import TicTacToe from "./games/TicTacToe.js";

const AVAILABLE_GAMES = [
    {
        name: 'TicTacToe',
        key: 'ttt'
    },
    // {
    //     name: 'SuperTicTacTo',
    //     key: 'sttt'
    // },
    // {
    //     name: 'Connect Four',
    //     key: 'c4'
    // }
];

// in-memory storage of roomNames -> room
export const rooms = new Map();

class Room {
    static get(roomName) {
        if (!rooms.has(roomName)) {
            rooms.set(roomName, new Room(roomName));
            console.log(`created '${roomName}' chatroom`);
        }

        return rooms.get(roomName);
    }

    constructor(roomName) {
        this.name = roomName;
        this.members = new Set();
        this.game = null;
        this.voteManager = new VoteManager(this);
    }

    /** Handle member joining a room.
     *
     * @param member {Player} joining member
     * */

    join = (member) => {
        console.log(`${member.name} #${member.id} joined '${this.name}' chat`);
        this.members.add(member);

        this.broadcast({
            type: "join",
            data: {
                members: this.getMembersObj(),
                player: {
                    name: member.name,
                    color: member.color,
                    id: member.id,
                    symbol: member.symbol
                }
            },
        });

        if (this.members.size === 2 && !this.game) {
            if (AVAILABLE_GAMES.length > 1) {
                this.chooseGameScreen();
            } else {
                this.initGame(AVAILABLE_GAMES[0].key);
            }

        }
    }

    initGame = (gameKey) => {
        switch (gameKey) {
            case 'ttt':
                this.game = new TicTacToe(this);
                break;
            case 'sttt':
                this.game = new SuperTicTacToe(this);
                break;
            case 'c4':
                // this.game = new Game(this, SuperTicTacToe);
                break;
            default:
                this.game = new TicTacToe(this);
        }

        const {state, gameId, activePlayer} = this.game;

        this.broadcast({
            type: 'game_created',
            data: {
                game: {
                    key: gameKey,
                    state,
                    activePlayer,
                    inited: true,
                    gameId
                },
            }
        });
    }

    chooseGameScreen = () => {
        this.broadcast({
            type: "available_games",
            data: {
                games: AVAILABLE_GAMES,
            }
        });
    }


    /** Handle member leaving a room.
     *
     * @param member {Player} leaving member
     * */

    leave(member) {
        this.members.delete(member);
        this.voteManager.reset();
        this.game?.resetState?.();
    }

    /** Send message to all members in a room.
     *
     * @param data {Object} message to send
     * */

    broadcast(data) {
        data.timestamp = new Date().toLocaleTimeString()
        this.members.forEach((member) => member.send(
                JSON.stringify(data)
            )
        );
    }

    getMembersObj = () => Array.from(this.members).map(({name, color, id, symbol}) => ({name, color, id, symbol}))
}

export default Room;
