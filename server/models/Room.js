"use strict";

/** Chat rooms that can be joined/left/broadcast to. */

import Game from './Game.js';
// in-memory storage of roomNames -> room

export const rooms = new Map();

/** Room is a collection of listening members; this becomes a "chat room"
 *   where individual users can join/leave/broadcast to.
 */

class Room {
  /** Get room by that name, creating if nonexistent.
   * <p>
   * This uses a programming pattern often called a "registry" ---
   * users of this class only need to .get to find a room; they don't
   * need to know about the `rooms` variable that holds the rooms. To
   * them, the Room class manages all of this stuff for them.
   *
   * @param roomName {string} room to get
   **/

  static get(roomName) {
    if (!rooms.has(roomName)) {
      rooms.set(roomName, new Room(roomName));
      console.log(`created '${roomName}' chatroom`);
    }

    return rooms.get(roomName);
  }

  /** Make a new room, starting with empty set of listeners.
   *
   * @param roomName {string} room name for new room
   * */

  constructor(roomName) {
    this.name = roomName;
    this.members = new Set();
    this.game = null;
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
      player: {name: member.name, color: member.color, id: member.id},
    });

    if (this.members.size === 2 && !this.game) {
      this.initGame();
    }
  }

  initGame = () => {
    this.game = new Game(this.members);

    const {state, gameId, activePlayer, players} = this.game;

    this.broadcast({
      type: 'game_created',
      text: `Game ${gameId} has been created`,
      game: {
        state,
        activePlayer,
        playersInRoom: this.game.playersInRoom
      },
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
   * @param data {string} message to send
   * */

  broadcast(data) {
    this.members.forEach((member) => member.send(
        JSON.stringify(
          {
            ...data,
            timestamp: new Date().toLocaleTimeString()
          }
        )
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
