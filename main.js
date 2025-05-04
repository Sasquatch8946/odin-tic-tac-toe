const game = (function () {
    const gameboard = () => {
        const gameboard = new Array(3);
        for (let i = 0; i < 3; i++) {
            gameboard[i] = new Array(3).fill(null);
        }

        return gameboard;
    }

    players = [];
    const p1 = createPlayer(0);
    const p2 = createPlayer(1);
    players.push(p1);
    players.push(p2);

    const playRound = (board) => {
        let currentPlayer = 0;
        let input;    
        let quit = false;
        let row;
        let col;
        while (!isGameWon(board) && !quit) {
            if (currentPlayer === 0) {
                console.log("It's player 1's turn.");
                input = prompt("enter coordinates:");
                console.log(`player 1 entered: ${input}`);
                [row, col] = input.split(' ');
                game.players[currentPlayer].playTurn(board, row, col);
                currentPlayer = 1;
            } else if (currentPlayer === 1) {
                console.log("It's player 2's turn.");
                input = prompt("enter coordinates:");
                console.log(`player 2 entered: ${input}`);
                [row, col] = input.split(' ');
                game.players[currentPlayer].playTurn(board, row, col);
                currentPlayer = 0;
            }


            
            if (input === 'q') {
                quit = true;
            }

        }

    }
    return { 
        gameboard,
        players,
        playRound,
    }

})();

function createPlayer (id) {
    let score = 0;
    let mark;
    let name;

    if (id === 0) {
        mark = 'x';
        name = 'Player 1';
    } else if (id === 1) {
        mark = 'o';
        name = 'Player 2';
    }
    function playTurn(gameboard, row, column, mark) {
        const playerMark = getMark();
        gameboard[row][column] = playerMark;
        console.log(gameboard);
    }

    function getMark() {
        return mark;
    }

    function getName() {
        return name;
    }

    return { 
        score,
        playTurn,
        getMark,
        getName,
    }
}

function controlFlow(board) {
    let currentPlayer = 0;
    let input;    
    let quit = false;
    let row;
    let col;
    while (!isGameWon(board) && !quit) {
        if (currentPlayer === 0) {
            console.log("It's player 1's turn.");
            input = prompt("enter coordinates:");
            console.log(`player 1 entered: ${input}`);
            [row, col] = input.split(' ');
            game.players[currentPlayer].playTurn(board, row, col);
            currentPlayer = 1;
        } else if (currentPlayer === 1) {
            console.log("It's player 2's turn.");
            input = prompt("enter coordinates:");
            console.log(`player 2 entered: ${input}`);
            [row, col] = input.split(' ');
            game.players[currentPlayer].playTurn(board, row, col);
            currentPlayer = 0;
        }


        
        if (input === 'q') {
            quit = true;
        }

    }
}

const checks = (function (board) {

    function isRowEqual(board) {
        let mark;
        let win = false;
        const isEqual = (row) => row.every(mark => mark === row[0] && mark !== null);
        board.forEach((row) => {
            if (isEqual(row)) {
                win = true;
                mark = row[0];
            }
        });


        if (win) {
            console.log("we have a winner! A row is equal")
            return { mark };
        } else {
            console.log("no row is equal");
            return false;
        }
    }
    function isColumnEqual(board) {
        let win = false;
        let mark;
        for (let col = 0; col < 3; col++) {
            const isEqual = board.every(row => row[col] === board[0][col] && row[col] !== null);
            if (isEqual) {
                win = true;
                mark = board[0][col];
            }

            

        }

        if (win) {
            console.log("we have a winner! A column is equal")
            return { mark };
        } else {
            console.log("no column is equal");
            return false;
        }
    }
    function isDiagonalEqual(board) {
        function isDiagonal1Equal(board) {
            if (board[0][0] === board[1][1] && 
                board[1][1] === board[2][2] && 
                board[0][0] !== null) {
                    return board[0][0];
            }
            else {
                return false;
            }
        }
        function isDiagonal2Equal(board) {
        if (board[0][3] === board[1][1] && 
            board[1][1] === board[2][0] &&
            board[0][3] !== null) {
                return board[0][3];
            }
            else {
                return false;
            }
        }

        if (isDiagonal1Equal(board) || isDiagonal2Equal(board)) {
            console.log("we have a winner! A diagonal is equal.");
            return isDiagonal1Equal(board) ? isDiagonal1Equal(board) : isDiagonal2Equal(board);
        } else {
            console.log("no diagonal is equal");
            return false;
        }
    }
    function isBoardFull(board) {

        let isBoardFull = true;
        const isRowFull = (row) => row.every(mark => mark !== null);
        board.forEach((row) => {
            if (!isRowFull(row)) {
                isBoardFull = false;
            }
        });

        console.log(`is board full? ${isBoardFull}`);
    }

    return {
        isRowEqual,
        isColumnEqual,
        isDiagonalEqual,
        isBoardFull,
    }

    
})();

function isGameWon(board) {
    const isRowEqual = checks.isRowEqual(board);
    const isColumnEqual = checks.isColumnEqual(board);
    const isDiagonalEqual = checks.isDiagonalEqual(board);
    const checkResults = [isRowEqual, isColumnEqual, isDiagonalEqual];
    console.log(checkResults);
    const gameWon = checkResults.filter((result) => result != false);
    console.log(gameWon);
    let winner;
    if (gameWon.length === 1) {
        console.log("game is won!");
        console.log(`player's mark ${gameWon[0].mark}`);
        winner = game.players.filter((p) => p.getMark() === gameWon[0].mark);
        console.log(`${winner[0].getName()} won!`);

    } else if (checks.isBoardFull(board)) {
        console.log("game has not been won yet, but board is full. Game over.");
    } else {
        console.log("Game has not been won yet and board isn't full. Keep playing.");
    }
}

const board = game.gameboard();
