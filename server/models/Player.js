"use strict";

const uid = () => Math.floor(Math.random() * 100) + Date.now().toString(36) + Math.random().toString(36).slice(2);

/** Functionality related to chatting. */

// Room is an abstraction of a chat channel
import Room from "./Room.js";

/** ChatUser is a individual connection from client -> server to chat. */

class Player {
    /** Make chat user: store connection-device, room.
     *
     * @param send {function} callback to send message to this user
     * @param roomName
     * */

    constructor(send, roomName) {
        this._send = send;
        this.room = Room.get(roomName);
        this.name = null;
        this.color = "#000";
        this.id = null;
    }

    /** Send msgs to this client using underlying connection-send-function **/

    send = (data) => this._send(data)

    /**
     * @param name {string}
     * @param color {string}
     */
    handleJoin = ({name, color}) => {
        this.name = name;
        this.color = color;
        this.id = uid();
        this.symbol = this.room.members.size < 1 ? 'x' : 'o';
        this.room.join(this);
    }

    /** Handle a chat: broadcast to room.
     *
     * @param text {string} message to send
     * */

    handleChat = (text) => {
        this.room.broadcast({
            type: "chat",
            data: {
                player: {
                    name: this.name,
                    color: this.color,
                    id: this.id
                },
                text: text
            },
        });
    }

    handleMessage = (jsonData) => {
        let msg = JSON.parse(jsonData);

        const {type} = msg;
        switch (type) {
            case 'join':
                this.handleJoin(msg.player);
                break;
            case 'chat':
                this.handleChat(msg.text);
                break;
            case 'get-members':
                this.handleGetMembers();
                break;
            case 'change-username':
                this.handleChangeUsername(msg.text)
                break;
            case 'move':
                this.room.game.onMove(msg);
                this.room.broadcast({
                    type: "move",
                    data: {
                        game: {
                            activePlayer: this.room.game.activePlayer,
                            state: this.room.game.state,
                            winner: this.room.game.winner
                        }
                    }
                });
                break;
            case 'vote':
                this.room.voteManager.addVote(msg.player.id, msg.game);
                break;

            default:
                throw new Error(`bad message: ${msg.type}`);
        }
    }

    /** Connection was closed: leave room, announce exit to others. */

    handleClose = () => {
        this.room.leave(this);
        this.room.broadcast({
            type: "left",
            data: {
                members: this.room.getMembersObj(),
            }
        });
    }

    /** Handle get room members:
     * - gets all room members
     * - send member names to this user only
     */

    handleGetMembers = () => {
        // members is a Set of user instances
        const members = this.room.getMembers();
        const memberNames = [];

        for (let member of members) {
            memberNames.push(member.name);
        }

        this.send(JSON.stringify(
            {
                type: "members",
                members: memberNames
            }));
    }

    /** Change user's name:
     *
     * @param username {string} new name for this user
     * */

    changeUsername = (username) => {
        this.name = username;
    }

    /** Handle changing a user's name: broadcast change to room.
     *
     * @param username {string} new name for this user
     * */

    handleChangeUsername = (username) => {
        const currentName = this.name;
        this.changeUsername(username);
        const updatedName = this.name;

        this.room.broadcast({
            name: "server",
            type: "chat",
            text: `The username for ${currentName} has changed to ${updatedName}`,
        });
    }
}

export default Player;
