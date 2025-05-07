const game = (function () {
    const gameboard = new Array(3);
    for (let i = 0; i < 3; i++) {
        gameboard[i] = new Array(3).fill(null);
    }

    players = [];
    const p1 = createPlayer(0);
    const p2 = createPlayer(1);
    players.push(p1);
    players.push(p2);

    let currentPlayer = 0;

    const getCurrentPlayer = () => {
        
        return players[currentPlayer].getName();
    }

    const changeCurrentPlayer = () => {
        if (currentPlayer === 0) {
            currentPlayer = 1;
        } else if (currentPlayer === 1) {
            currentPlayer = 0;
        }

        return currentPlayer;
    }

    const getBoard = () => {
        return gameboard;
    }

    const setBoard = (row, column, mark) => {
        let board = getBoard();
        board[row][column] = mark;
    }

    const playRound = (board) => {
        let currentPlayer;
        let input;    
        let quit = false;
        let row;
        let col;
        while (!isGameWon(board) && !quit) {
            currentPlayer = getCurrentPlayer();
            if (currentPlayer === 0) {
                console.log("It's player 1's turn.");
                waitForClick();
            } else if (currentPlayer === 1) {
                console.log("It's player 2's turn.");
                waitForClick();
            }

        }

    }

    return { 
        gameboard,
        players,
        playRound,
        getCurrentPlayer,
        changeCurrentPlayer,
        getBoard,
        setBoard,
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
    function playTurn(gameboard, row, column) {
        const playerMark = getMark();
        game.setBoard(row, column, playerMark);
        console.log(game.getBoard());
    }

    function getMark() {
        return mark;
    }

    function getName() {
        return name;
    }

    function setName(newName) {
        name = newName;
        return name;
    }

    return { 
        score,
        playTurn,
        getMark,
        getName,
        setName,
    }
}


const checks = (function () {

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
            // console.log("no row is equal");
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
            // console.log("no column is equal");
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

        let mark; 

        let test1 = isDiagonal1Equal(board);
        let test2 = isDiagonal2Equal(board);

        if (test1) {
            mark = test1;
        } else if (test2) {
            mark = test2;
        }
        if (mark) {
            console.log("we have a winner! A diagonal is equal.");
            return { mark }
        } else {
            // console.log("no diagonal is equal");
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

        return isBoardFull;
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
    // console.log(checkResults);
    const gameWon = checkResults.filter((result) => result != false);
    // console.log(gameWon);
    let winner;
    if (gameWon.length === 1) {
        console.log("game is won!");
        console.log(`player's mark ${gameWon[0].mark}`);
        winner = game.players.filter((p) => p.getMark() === gameWon[0].mark);
        console.log(`${winner[0].getName()} won!`);

    } else if (checks.isBoardFull(board)) {
        console.log("Game has not been won yet, but board is full. It's a tie!");
    } else {
        console.log("Game has not been won yet and board isn't full. Keep playing.");
    }
}


const squares = document.querySelectorAll('.square');
squares.forEach((square) => {
    square.addEventListener('click', (event) => {
        const board = game.getBoard();
        const currentPlayer = game.getCurrentPlayer();
        const playerMark = game.players[currentPlayer].getMark();
        const container = event.target.parentNode;
        const indx = Array.prototype.indexOf.call(container.children, event.target);
        console.log(indx);
        const c = getCoords(indx); 
        console.log(c);
        if (board[c.row][c.col] === null) {
            game.players[currentPlayer].playTurn(board, c.row, c.col);
            game.changeCurrentPlayer();
            displayController.updateDisplay(c.row, c.col, playerMark);
            isGameWon(board);
        } else {
            console.log("oops a player already placed their marker there, try again");
        }
    });
});


function getCoords(indx) {
    switch (true) {
        case indx >= 0 && indx < 3:
            row = 0;
            col = indx;
            return { row, col };        
        case indx > 2 && indx < 6:
            row = 1;
            col = indx - 3;
            return { row, col };
        case indx > 5 && indx < 9: 
            row = 2;
            col = indx - 6;
            return { row, col };
        default:
            return "something went wrong, couldn't get coords";
    }

}

function convertCoordsToIndx(row, column) {
    switch (row) {
        case 0:
            return column;
        case 1: 
            return column + 3;
        case 2: 
            return column + 6;
    }
}

const displayController = (function () {
    const updateDisplay = (row, column, mark) => {
        console.log("update display");
        const container = document.querySelector('.grid-container');
        let indx = convertCoordsToIndx(row, column);
        console.log(`indx: ${indx}`);
        let cnArray = Array.from(container.childNodes);
        let squares = cnArray.filter((cn) => cn.nodeName !== '#text');
        let square = squares[indx];
        console.log(square);
        square.innerText = mark;
    };

    const updateStatusBar = (text) => {
        const statusBar = document.querySelector('.status-bar');
        statusBar.innerText = text;
    }

    return {
        updateDisplay,
        updateStatusBar,
    };
})();

const startButton = document.querySelector("button[type='submit']");
startButton.addEventListener("click", () => {
    const nameFields = document.querySelectorAll("input[type='text']");
    const nameFieldsArr = Array.from(nameFields);
    for (let i = 0; i < nameFieldsArr.length; i++) {
        let val = nameFieldsArr[i].value;
        if (val) {
            game.players[i].setName(val);
        }
    }

    displayController.updateStatusBar(`${game.players[0].getName()}'s turn!`);
});