document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM Content Loaded");
    //RETREIVE HTML ELEMENTS
    const boxes = document.querySelectorAll(".box");
    const strikethrough = document.getElementById("strikethrough");
    const gameOverArea = document.getElementById("game-over-area");
    const gameOverText = document.getElementById("game-over-text");
    const playAgain = document.getElementById("play-again");
    const playerxDiv = document.getElementById("player-X");
    const playeroDiv = document.getElementById("player-O");
    //CREATE PLAYERS, ARRAY THAT REPRESENTS BOARD AND WINNING COMBOS
    const playerX = "X";
    const playerO = "O";
    const boardState = Array(boxes.length); //TRACKS STATE OF PROGRAM - CREATED AN ARRAY WHICH HAS 9 ITEMS(BOXES)
    const winningCombos = [
        //ROWS
        {  // KEY   VALUE
            combo: [1, 2, 3],
            strikeClass: "strike-row-1"
        },
        {
            combo: [4, 5, 6],
            strikeClass: "strike-row-2"
        },
        {
            combo: [7, 8, 9],
            strikeClass: "strike-row-3"
        },
        //COLUMNS
        {
            combo: [1, 4, 7],
            strikeClass: "strike-column-1"
        },
        {
            combo: [2, 5, 8],
            strikeClass: "strike-column-2"
        },
        {
            combo: [3, 6, 9],
            strikeClass: "strike-column-3"
        },
        //DIAGONALS
        {
            combo: [1, 5, 9],
            strikeClass: "strike-diagonal-1"
        },
        {
            combo: [3, 5, 7],
            strikeClass: "strike-diagonal-2"
        },
    ];
    let turn = playerX; //TRACKS WHO'S TURN IT IS

    playAgain.addEventListener("click", restartGame);

    //THE FILL() METHOD CHANGES ALL ELEMENTS IN AN ARRAY TO A STATIC VALUE, FROM A START INDEX (DEFAULT 0) TO 
    //AN END INDEX (DEFAULT ARRAY.LENGTH). IT RETURNS THE MODIFIED ARRAY
    boardState.fill(null);

    boxState();
    //FUNCTION THAT ITERATATES OVER LIST OF BOXES AND ADDS AN EVENT LISTENER TO EACH INDIVIDUAL BOX
    function boxState() {
        boxes.forEach((box) => {
            box.addEventListener("click", boxClick); //FUNCTION WILL BE CALLED WHENEVER THE SPECIFIED EVENT IS DELIVERED TO THE TARGET
        })
    }

    function boxClick(e) {
        const box = e.target; //REFERENCE TO THE HTML ELEMENT CLICKED
        const boxNumber = box.dataset.index;//ACCESS DATA-INDEX ATTRIBUTE
        //IF GAMEOVER AREA CLASSLIST CONTAINNS "VISIBLE" THE FUNCTION WILL STOP EXECUTING
        if (gameOverArea.classList.contains("visible")) {
            return;
        }
        //CHECK IF SPECIFIC BOX IS EMPTY OR HAS AN "X" OR "O" IN IT
        if (box.innerText != "") {
            return;
        }
        if (turn === playerX) {
            box.innerText = playerX;
            boardState[boxNumber - 1] = playerX; //ARRAYS ARE ZERO INDEXED SO I NEED TO SUBTRACT 1 FROM PLAYERS CHOICE FOR GAME TO BE ACCURATE
            turn = playerO;
            console.log(`It's ${playeroDiv.innerText}'s turn`);
        } else {
            box.innerText = playerO;
            boardState[boxNumber - 1] = playerO;
            turn = playerX;
            console.log(`It's ${playerxDiv.innerText}'s turn`);
        }

        //FUNCTION IS CALLED ON EVERY SINGLE BOX CLICK - CHECKS IF THERE IS A WINNER
        checkWinner()
    }

    function checkWinner() {
        //CHECK FOR A WINNER BY LOOPING THROUGH ALL OF THE WINNING COMBINATIONS
        for (const winningCombo of winningCombos) {
            const { combo, strikeClass } = winningCombo; //EXTRACTING COMBO / STRIKETHROUOGH FROM ARRAY
            const boxValue1 = boardState[combo[0] - 1];
            const boxValue2 = boardState[combo[1] - 1];
            const boxValue3 = boardState[combo[2] - 1];
 
            if (boxValue1 != null && 
                boxValue1 === boxValue2 && 
                boxValue1 === boxValue3) {
                strikethrough.classList.add(strikeClass);
                gameOverScreen(boxValue1);
                return;
            }
        }
        
       //CHECK FOR A DRAW - REFACTOR
       const allBoxesFilledIn = boardState.every((tile) => tile !== null);
    if (allBoxesFilledIn) {
        gameOverScreen(null);
        console.log("it's a draw");
    }

    }

    function gameOverScreen(wText) {
        let text = "Draw!";
        if (wText != null) {
            text = `Winner is ${wText}`;
        }
        gameOverArea.className = "visible";
        gameOverText.innerText = text;
    }


    function restartGame() {
        strikethrough.className = "strikethrough";
        gameOverArea.className = "hidden";
        boardState.fill(null);
        boxes.forEach((box) => {
            box.innerText = "";
        })
        turn = playerX;
    }
})
