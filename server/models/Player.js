"use strict";

import Game from "./Game.js";

const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2);

/** Functionality related to chatting. */

// Room is an abstraction of a chat channel
import Room from "./Room.js";
import {json} from "express";

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
    this.color = null;
    this.id = null;
  }

  /** Send msgs to this client using underlying connection-send-function **/

  send(data) {
    this._send(data);
  }

  /**
   *
   * @param name {string}
   * @param color {string}
   */
  handleJoin = ({name, color}) => {
    this.name = name;
    this.color = color;
    this.id = uid();
    this.symbol = !this.room.members.size ? 'x' : 'o';
    this.room.join(this);
  }

  /** Handle a chat: broadcast to room.
   *
   * @param text {string} message to send
   * */

  handleChat = (text) => {
    this.room.broadcast({
      type: "chat",
      player: {name: this.name, color: this.color, id: this.id},
      text: text,
    });
  }

  /** Handle a private chat: send to recipient only.
   *
   * @param recipient {string} recipient of chat
   * @param text {string} message to send
   * */

  handlePrivateChat = (recipient, text) => {
    const member = this.room.getMember(recipient);
    member.send(JSON.stringify(
      {
        name: this.name,
        type: "priv-chat",
        text: text,
      }));
  }

  /** Handle messages from client:
   *
   * @param jsonData {string} raw message data
   *
   * @example<code>
   * - {type: "join", name: username} : join
   * - {type: "chat", text: msg }     : chat
   * </code>
   */

  handleMessage = (jsonData) => {
    let msg = JSON.parse(jsonData);

    if (msg.type === "join") this.handleJoin(msg.player);
    else if (msg.type === "chat") this.handleChat(msg.text);
    else if (msg.type === "get-members") this.handleGetMembers();
    else if (msg.type === "change-username") this.handleChangeUsername(msg.text);
    else if (msg.type === "priv-chat") this.handlePrivateChat(msg.recipient, msg.text);
    else if (msg.type === 'move') {
      this.room.game.onMove(msg);
      this.room.broadcast({
        type: "move",
        game: {
          activePlayer: this.room.game.activePlayer,
          state: this.room.game.state,
          winner: this.room.game.winner
        }
      });
    } else throw new Error(`bad message: ${msg.type}`);
  }

  /** Connection was closed: leave room, announce exit to others. */

  handleClose = () => {
    this.room.leave(this);
    this.room.broadcast({
      type: "left",
      text: `${this.name} left ${this.room.name}.`,
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
        name: "In room",
        type: "chat",
        text: memberNames.join(", "),
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
