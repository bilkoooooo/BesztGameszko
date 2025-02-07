"use strict";

/** Chat rooms that can be joined/left/broadcast to. */

import Game from './Game.js';
import VoteManager from "../utils/VoteManager.js";
// in-memory storage of roomNames -> room
const AVAILABLE_GAMES = [
    {
        name: 'SuperTicTacTo',
        key: 'sttt'
    },
    {
        name: 'Connect Four',
        key: 'c4'
    }
]
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
        this.voteManager = new VoteManager(this.members);
        console.log(this);
    }

    /** Handle member joining a room.
     *
     * @param member {Player} joining member
     * */

    join(member) {
        console.log(`${member.name} joined '${this.name}' chat`);
        this.members.add(member);

        this.broadcast({
            type: "join",
            data: {
                player: {name: member.name, color: member.color, id: member.id}
            },
        });

        if (this.members.size === 1 && !this.game) {
            this.chooseGameScreen();
        }
    }

    initGame = () => {
        this.game = new Game(this.members);

        const {state, gameId, activePlayer, players} = this.game;

        this.broadcast({
            type: 'game_created',
            data: {
                text: `Game ${gameId} has been created`,
                game: {
                    state,
                    activePlayer,
                    playersInRoom: this.game.playersInRoom
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
        delete this.game;
        this.game = null;
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

    /** Return a Set containing all room members */

    getMembers() {
        return this.members;
    }

    /** Get a room member: returns member or undefined if not found.
     *
     * @param name {string} name of member to get
     * */

    getMember(name) {
        for (let member of this.members) {
            if (member.name === name) return member;
        }
    }
}

export default Room;
