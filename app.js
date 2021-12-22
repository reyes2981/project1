console.log("js and html files are connected");

const board = document.getElementById('game-board');
console.log(board);
//https://medium.com/@axeldahlin/two-dimensional-array-canvas-board-games-fd417e92953
const boardArray = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

for (let i = 0; i < boardArray.length; i++) {
    for (let j = 0; j < boardArray.length; j++) {
        console.log(boardArray[i][j]);
        boardArray.forEach((x, y) => console.log(x, y))
    }
}

function loadBoard() {
    const div1 = document.createElement('div');
}
