document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM Content Loaded");
    //RETREIVE HTML ELEMENTS
    const boxes = document.querySelectorAll(".box");
    const strikethrough = document.getElementById("strikethrough");
    const gameOverArea = document.getElementById("game-over-area");
    const gameOverText = document.getElementById("game-over-text");
    const playAgain = document.getElementById("play-again");
    //CREATE PLAYERS, ARRAY THAT REPRESENTS BOARD AND WINNING COMBOS
    const playerX = "X";
    const playerO = "O";
    const boardArray = Array(boxes.length); //TRACKS STATE OF PROGRAM - CREATED AN ARRAY WHICH HAS 9 ITEMS(BOXES)
    const winningCombos = [
        //ROWS
        {  // KEY   VALUE
            combo: [0, 1, 2],
            strikeClass: "strike-row-1"
        },
        {
            combo: [3, 4, 5],
            strikeClass: "strike-row-2"
        },
        {
            combo: [6, 7, 8],
            strikeClass: "strike-row-3"
        },
        //COLUMNS
        {
            combo: [0, 3, 6],
            strikeClass: "strike-column-1"
        },
        {
            combo: [1, 4, 7],
            strikeClass: "strike-column-2"
        },
        {
            combo: [2, 5, 8],
            strikeClass: "strike-column-3"
        },
        //DIAGONALS
        {
            combo: [0, 4, 8],
            strikeClass: "strike-diagonal-1"
        },
        {
            combo: [2, 4, 6],
            strikeClass: "strike-diagonal-2"
        },
    ];
    let turn = playerX; //TRACKS WHO'S TURN IT IS

    playAgain.addEventListener("click", restartGame);

    //THE FILL() METHOD CHANGES ALL ELEMENTS IN AN ARRAY TO A STATIC VALUE, FROM A START INDEX (DEFAULT 0) TO 
    //AN END INDEX (DEFAULT ARRAY.LENGTH). IT RETURNS THE MODIFIED ARRAY
    boardArray.fill(null);

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
            boardArray[boxNumber - 1] = playerX; //ARRAYS ARE ZERO INDEXED SO I NEED TO SUBTRACT 1 FROM PLAYERS CHOICE FOR GAME TO BE ACCURATE
            turn = playerO;
        } else {
            box.innerText = playerO;
            boardArray[boxNumber - 1] = playerO;
            turn = playerX;
        }

        //FUNCTION IS CALLED ON EVERY SINGLE BOX CLICK - CHECKS IF THERE IS A WINNER
        checkWinner()
    }

    function checkWinner() {
        //CHECK FOR A WINNER BY LOOPING THROUGH ALL OF THE WINNING COMBINATIONS
        for (const winningCombo of winningCombos) {
            const combo = winningCombo.combo; //EXTRACTING COMBO FROM ARRAY
            const strikeClass = winningCombo.strikeClass; //EXTRACTING STRIKECLASS FROM ARRAY

            const boxValue1 = boardArray[combo[0]];
            const boxValue2 = boardArray[combo[1]];
            const boxValue3 = boardArray[combo[2]];

            if (boxValue1 != null &&
                boxValue1 === boxValue2 &&
                boxValue1 === boxValue3) {
                strikethrough.classList.add(strikeClass);
                gameOverScreen(boxValue1);
            }
        }

        //CHECK FOR A DRAW - REFACTOR
        const allBoxFilledIn = boardArray.every((box) => {
            box != null
        })

        if (allBoxFilledIn) {
            gameOverScreen(null);
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
        console.log("Play Again");
    }
})

//RESOURCES
//https://www.py4u.net/discuss/1158967
//https://www.youtube.com/watch?v=GTWrWM1UsnA&t=829s
//https://stackoverflow.com/questions/58113438/javascript-tic-tac-toe-check-if-someone-won
//https://stackoverflow.com/questions/53311809/all-possible-combinations-of-a-2d-array-in-javascript
//https://www.youtube.com/watch?v=B3pmT7Cpi24&t=124s
//https://www.youtube.com/watch?v=fPew9OI2PnA
//https://codepen.io/shammadahmed/pen/JOWEGW
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill
//https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
//https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes
//
//

//Open Show all commands. Linux and Windows: Ctrl + Shift + P
//Type in the command, e.g. lower, upper, title