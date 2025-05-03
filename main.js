const game = (function () {
    const gameboard = () => {
        const gameboard = new Array(3);
        for (let i = 0; i < 3; i++) {
            gameboard[i] = new Array(3).fill(null);
        }

        return gameboard;
    }

    return { 
        gameboard,
    }

})();

function createPlayer (id) {
    let score = 0;
    var mark;

    if (id === 1) {
        mark = 'x';
    } else if (id === 2) {
        mark = 'o';
    }
    function playTurn(gameboard, row, column, mark) {
        const playerMark = getPlayerMark();
        gameboard[row][column] = playerMark;
        console.log(gameboard);
    }

    function getPlayerMark() {
        return mark;
    }

    return { 
        score,
        playTurn,
        mark,
    }
}

function controlFlow() {
    let turns = [];
    
    while (!isGameWon()) {
        if (!turns) {
            turns.push(1);
            console.log("Player 1's turn");
        }
    }
}

const checks = (function (board) {

    function isRowEqual(board) {

        let win = false;
        const isEqual = (row) => row.every(mark => mark === row[0] && mark !== null);
        board.forEach((row) => {
            if (isEqual(row)) {
                win = true;
            }
        });


        if (win) {
            console.log("we have a winner! A row is equal")
        } else {
            console.log("no row is equal");
        }
    }
    function isColumnEqual(board) {
        let win = false;
        for (let col = 0; col < 3; col++) {
            const isEqual = board.every(row => row[col] === board[0][col] && row[col] !== null);
            if (isEqual) {
                win = true;
            }

            

        }

        if (win) {
            console.log("we have a winner! A column is equal")
        } else {
            console.log("no column is equal");
        }
    }
    function isDiagnoalEqual(board) {
        //
    }

    return {
        isRowEqual,
        isColumnEqual,
    }

    
})();

const board = game.gameboard();
const player1 = createPlayer(1);
const player2 = createPlayer(2);