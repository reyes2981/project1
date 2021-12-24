 //start game


let boardArray = [["1", "2", "3"],
             ["4", "5", "6"],
             ["7", "8", "9"]]; 

// document.addEventListener("DOMContentLoaded", () => {
//     console.log("DOM Content Loaded");
// })

//render board
 loadBoard();

 function loadBoard() {
     const gameBoard = document.createElement("table");
     gameBoard.id = "board-container"
    //  let i = 0; //counter
     for (let r = 0; r < 3; r++) {
         let row = gameBoard.insertRow(-1); //inserts a new row (<tr>) in a given <table>, and returns a reference to the new row.
         for (let c = 0; c < 3; c++) {
             const cell = row.insertCell(-1); //inserts a new cell (<td>) into a table row (<tr>) and returns a reference to the cell.
             cell.appendChild(document.createTextNode(boardArray[r][c]));
         }
     }
     document.body.appendChild(gameBoard);
 }


//player logic

//game ends


//RESOURCES
//https://www.py4u.net/discuss/1158967
//https://www.youtube.com/watch?v=GTWrWM1UsnA&t=829s
