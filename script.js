const gameboard = (() => {
    const board = [];
    return { board };
})();

const player = (playerName, symbol, score) => {
    const setScore = () => {
        score += 1;
    }
    const getScore = () => {
        return score;
    }
    const getName = () => {
        return playerName;
    }
    const setName = (name) => {
        playerName = name;
    }
    const getSymbol = () => {
        return symbol;
    }
    return { setScore, getName, setName, getSymbol };
}
const game = (() => {
    let player1 = player("Player 1", "x", 0);
    let player2 = player("Computer", "o", 0);
    let turn = player1;
    const changeTurn = () => {
        if (turn !== player1) {
            turn = player1
        }
        else {
            turn = player2;
        }
    }
    const getTurn = () => {
        return turn;
    }
    const getPlayer1 = () => {
        return player1;
    }
    const getPlayer2 = () => {
        return player2;
    }
    return {
        changeTurn, getTurn,
        getPlayer1, getPlayer2
    }
})();

const createBoard = () => {
    const board = document.getElementById("board");
    for (i = 0; i < 9; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.dataset.index = i;
        board.appendChild(square);
        gameboard.board[i] = null;
    }
};

const deleteBoard = () => {
    const board = document.getElementById("board");
    const squares = document.getElementsByClassName("square");
    Array.from(squares).forEach((square) => {
        board.removeChild(square);
    })
    
}

const winCheck = (() => {
    const index = (row, col) => (row * 3) + col;
    //rows
    for (i = 0; i < 3; i++) {
        const row = [];
        for (j = 0; j < 3; j++) {
            row.push(gameboard.board[index(i, j)]);
        }
        if (row.every((currentValue) => currentValue == game.getPlayer1().getSymbol())) {
            return game.getPlayer1();
        }
        else if (row.every((currentValue) => currentValue == game.getPlayer2().getSymbol())) {
            return game.getPlayer2();
        }
    }
    //columns
    for (i = 0; i < 3; i++) {
        const col = [];
        for (j = 0; j < 3; j++) {
            col.push(gameboard.board[index(j, i)]);
        }
        if (col.every((currentValue) => currentValue == game.getPlayer1().getSymbol())) {
            return game.getPlayer1();
        }
        else if (col.every((currentValue) => currentValue == game.getPlayer2().getSymbol())) {
            return game.getPlayer2();
        }
    }
    //diagnol 0/4/8
    let diagnol = []
    for (i = 0; i < 3; i++) {
        diagnol.push(gameboard.board[index(i, i)]);
    }
    if (diagnol.every((currentValue) => currentValue == game.getPlayer1().getSymbol())) {
        return game.getPlayer1();
    }
    else if (diagnol.every((currentValue) => currentValue == game.getPlayer2().getSymbol())) {
        return game.getPlayer2();
    }
    //diagnol 2/4/6
    diagnol = []
    diagnol.push(gameboard.board[index(0, 2)]);
    diagnol.push(gameboard.board[index(1, 1)]);
    diagnol.push(gameboard.board[index(2, 0)]);
    if (diagnol.every((currentValue) => currentValue == game.getPlayer1().getSymbol())) {
        return game.getPlayer1();
    }
    else if (diagnol.every((currentValue) => currentValue == game.getPlayer2().getSymbol())) {
        return game.getPlayer2();
    }
    //tie
    if (gameboard.board.every((currentValue) => currentValue != null)) {
        return "tie"
    }

})

const boardListener = (() => {
    const board = document.getElementById("board");
    board.addEventListener("click", (e) => {
        console.log(e.target);
        const squareIndex = e.target.dataset.index;
        const square = document.querySelector("[data-index='" + squareIndex + "']");
        if (gameboard.board[squareIndex] == null) {
            if (game.getTurn() == game.getPlayer1()) {
                gameboard.board[squareIndex] = game.getPlayer1().getSymbol();
                square.classList.add(game.getPlayer1().getSymbol());
            }
            else if (game.getTurn() == game.getPlayer2()) {
                gameboard.board[squareIndex] = game.getPlayer2().getSymbol();
                square.classList.add(game.getPlayer2().getSymbol())
            }
            const winner = document.getElementById("winner");
            if (winCheck() == game.getPlayer1()) {
                document.getElementById("winner").style.color = "cyan";
                winner.textContent = game.getPlayer1().getName() + "  wins!"
                

            }
            else if (winCheck() == game.getPlayer2()) {
                document.getElementById("winner").style.color = "magenta";
                winner.textContent = game.getPlayer2().getName() + "    wins!"
            }
            else if (winCheck() == "tie") {
                winner.textContent = "You tie!"
            }
            else {
                game.changeTurn();
            }

        }
    })
})();

const formListener = (() => {
    const form = document.getElementById("form");
    const inputOne = document.getElementById("playerOneName")
    const inputTwo = document.getElementById("playerTwoName")
    let humanOne = true;
    let humanTwo = false;;
    const buttons = form.querySelectorAll("input")
    const restart = document.getElementById("restart");
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            if (button.id == "humanOne") {
                console.log("human1");
                humanOne = true;
            }
            else if (button.id == "aiOne") {
                console.log("ai1");
                humanOne = false;
            }
            if (button.id == "humanTwo") {
                console.log("human2");
                humanTwo = true;
            }
            else if (button.id == "aiTwo") {
                console.log("ai2");
                humanTwo = false;
            }
            if (button.id == "start") {
                if (humanOne == true && inputOne.value != "") {
                    game.getPlayer1().setName(inputOne.value);
                }
                if (humanTwo == true && inputTwo.textContent != "") {
                    game.player2.setName(inputTwo.textContent);
                }
                form.style.display = "none";
                createBoard();
                const board = document.getElementById("board");
                board.style.display = "grid";
                
                restart.style.display = "block";
            }
        })
    })
    restart.addEventListener("click" , () => {
        deleteBoard();
        createBoard();
        winner.textContent = "";
       
    })

})();





