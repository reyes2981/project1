window.addEventListener("DOMContentLoaded", () => {
    console.log("DOM Content Loaded");

    const boxes = document.querySelectorAll(".box");
    const playerX = "X";
    const playerO = "O";
    const boardArray = Array(boxes.length);
    const strikethrough = document.getElementById("strikethrough");
    const gameOverArea = document.getElementById("game-over-area");
    const gameOverText = document.getElementById("game-over-text");
    const playAgain = document.getElementById("play-again");
    const winningCombinations = [
        //rows
        { combo: [1, 2, 3], strikeClass: "strike-row-1" },
        { combo: [4, 5, 6], strikeClass: "strike-row-2" },
        { combo: [7, 8, 9], strikeClass: "strike-row-3" },
        //columns
        { combo: [1, 4, 7], strikeClass: "strike-column-1" },
        { combo: [2, 5, 8], strikeClass: "strike-column-2" },
        { combo: [3, 6, 9], strikeClass: "strike-column-3" },
        //diagonals
        { combo: [1, 5, 9], strikeClass: "strike-diagonal-1" },
        { combo: [3, 5, 7], strikeClass: "strike-diagonal-2" },
    ];
    let turn = playerX;

    boardArray.fill(null);

    boxes.forEach(box => {
        box.addEventListener("click", boxClick);
    })

    function boxClick(e) {
        if (gameOverArea.classList.contains("visible")) {
            return;
        }
        const box = e.target;
        const boxNumber = box.dataset.index;
        if (box.innerText != "") {
            return;
        }
        if (turn === playerX) {
            box.innerText = playerX;
            boardArray[boxNumber - 1] = playerX;
            turn = playerO;
        } else {
            box.innerText = playerO;
            boardArray[boxNumber - 1] = playerO;
            turn = playerX;
        }
        checkWinner()
    }

    function checkWinner() {
        //check for a winner
        for (const winningCombo of winningCombinations) {
            //object destruscturing
            const { combo, strikeClass } = winningCombo;
            const boxValue1 = boardArray[combo[0] - 1];
            const boxValue2 = boardArray[combo[1] - 1];
            const boxValue3 = boardArray[combo[2] - 1];
            if (boxValue1 != null &&
                boxValue1 === boxValue2 &&
                boxValue1 === boxValue3) {
                strikethrough.classList.add(strikeClass);
                gameOverScreen(boxValue1);
            }
        }
        //check for a draw
        const allBoxFilledIn = boardArray.every((box) => {
            box != null
        })

        if (allBoxFilledIn) {
            gameOverScreen(null);
        }
    }

    function gameOverScreen(winnerText) {
        let text = "Draw!";
        if (winnerText != null) {
            text = `Winner is ${winnerText}`;
        }
        gameOverArea.className = "visible";
        gameOverText.innerText = text;
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
//