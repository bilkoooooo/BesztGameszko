import Game from '../Game.js';

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

export default class SuperTicTacToe extends Game {
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

    setState = ({cell}) => {
        const [col, row] = cell.split('_');

        this.state[row][col] = this.getPlayerById(this.activePlayer).symbol;
        this.steps++;
        if (this.checkWin()) {
            this.winner = this.activePlayer;
        }

        if (this.steps === 9 && !this.checkWin()) {
            this.winner = 'draw';
        }
        this.setActivePlayer();
    }
}