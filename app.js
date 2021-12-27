//start game
window.addEventListener("DOMContentLoaded", () => {
    console.log("DOM Content Loaded");
    const boxes = document.querySelectorAll(".box");
    const playerX = "X";
    const playerO = "O";
    let turn = playerX;
    const boardArray = Array(boxes.length);
    boardArray.fill(null);
    const strikethrough = document.getElementById("strikethrough");
    const gameOverArea = document.getElementById("game-over-area");
    const gameOverText = document.getElementById("game-over-text");
    const playAgain = document.getElementById("play-again");
 

    // const winningCombos = [
    //     [0, 1, 2],
    //     [3, 4, 5],
    //     [6, 7, 8],
    //     [0, 3, 6],
    //     [1, 4, 7],
    //     [2, 5, 8],
    //     [0, 4, 8],
    //     [2, 4, 6]
    // ];
  
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

        if(turn === playerX) {
            box.innerText = playerX;
            boardArray[boxNumber-1] = playerX;
            turn = playerO;
        } else {
            box.innerText = playerO;
            boardArray[boxNumber-1] = playerO;
            turn = playerX;
        }
      }



    


    //player logic


    //game logic

    //game ends

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