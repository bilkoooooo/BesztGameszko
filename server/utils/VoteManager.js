class VoteManager {
    constructor(players) {
        this.votes = new Map();
        console.log(players);
        this.players = [] ?? players;
    }

    addVote(playerId, game) {
        this.votes.set(playerId, game);
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