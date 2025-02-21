class VoteManager {
    constructor(room) {
        this.room = room;
        this.votes = new Map();
    }

    addVote(playerId, game) {
        this.votes.set(playerId, game);

        this.room.broadcast({
            type: "vote",
            data: {
                votes: this.getVoteCounts(),
                votesCount: Number(this.votes.size)
            }
        });

        if (this.votes.size === this.room.members.size) {
            this.room.initGame(this.determineWinningGame());
            this.reset();
        }
    }

    getVoteCounts() {
        const voteCounts = {};
        for (const vote of this.votes.values()) {
            voteCounts[vote] = (voteCounts[vote] || 0) + 1;
        }
        return voteCounts;
    }

    determineWinningGame() {
        const voteCounts = this.getVoteCounts();
        return Object.entries(voteCounts).reduce((a, b) =>
            b[1] > a[1] ? b : a
        )[0];
    }

    reset() {
        this.votes.clear();
    }
}

export default VoteManager;