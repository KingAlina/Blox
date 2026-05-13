const rows = 20;
const cols = 10;
const board = Array.from({ length: rows }, () => Array(cols).fill(0)); //nur logisch nicht visuell, 2D
//let gameOver = false;

//To Do: Interface?
let block;

const shapes = [
  [
    //Block
    [1, 1],
    [1, 1],
  ],
  [
    //I
    [1],
    [1],
    [1],
    [1],
  ],
  [
    //L
    [1, 0],
    [1, 0],
    [1, 1],
  ],
  [
    //J
    [0, 1],
    [0, 1],
    [1, 1],
  ],
  [
    //T
    [1, 1, 1],
    [0, 1, 0],
  ],
  [
    //Z
    [1, 1, 0],
    [0, 1, 1],
  ],
  [
    //S
    [0, 1, 1],
    [1, 1, 0],
  ],
];

const grid = document.getElementById("grid");
//200 Zellen in Gameboard erzeugen
for (let i = 0; i < rows * cols; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  grid.appendChild(cell);
}

const cells = Array.from(grid.children); //visuelle Darstellung mittels 1D Array
//console.log(cells);
function drawBoard() {
  //alles leeren
  cells.forEach((cell) => {
    cell.classList.remove("filled");
  });
  //feste Blöcke im Board
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (board[y][x] === 1) {
        const index = y * cols + x;
        cells[index].classList.add("filled");
      }
    }
  }
  // aktuell fallender Block
  for (let row = 0; row < block.shape.length; row++) {
    for (let col = 0; col < block.shape[row].length; col++) {
      if (block.shape[row][col] === 1) {
        const x = block.x + col;
        const y = block.y + row;
        const index = y * cols + x;
        cells[index].classList.add("filled");
      }
    }
  }
}

function canCreateBlock() {
  //falls kein Platz mehr liefert false
  for (let row = 0; row < block.shape.length; row++) {
    for (let col = 0; col < block.shape[row].length; col++) {
      if (block.shape[row][col] === 1) {
        //prüfen ob Feld frei?
        const x = block.x + col;
        const y = block.y + row;
        if (board[y][x] === 1) {
          return false;
        }
      }
    }
  }
  return true;
}

function createNewBlock() {
  const randomIndex = Math.floor(Math.random() * shapes.length); //Zahl zwischen 0 und 6
  const randomShape = shapes[randomIndex];
  block = {
    shape: randomShape,
    x: Math.floor((cols - randomShape[0].length) / 2), //platziert den Stein mittig im Verhältnis zu seiner Breite
    y: 0,
  };
}

//Spielstart, TODO: start/pause button
createNewBlock();
drawBoard();

function canMoveDown() {
  //Form durchgehen
  for (let row = 0; row < block.shape.length; row++) {
    for (let col = 0; col < block.shape[row].length; col++) {
      //wenn gefüllter Teil des Blocks
      if (block.shape[row][col] === 1) {
        //neue Position nach Bewegung
        const x = block.x + col;
        const newY = block.y + row + 1;
        //wenn es außerhalb des Spielfelds wäre oder schon belegt ist
        if (newY >= rows || board[newY][x] === 1) {
          return false;
        }
      }
    }
  }
  return true;
}

//function canMoveLeft(){}
//function canMoveRigth(){}

document.querySelector(".left").addEventListener("click", () => {
  if (block.x > 0) {
    block.x--;
    drawBoard();
  }
});

document.querySelector(".right").addEventListener("click", () => {
  if (block.x + block.shape[0].length < cols) {
    block.x++;
    drawBoard();
  }
});

document.querySelector(".down").addEventListener("click", () => {
  moveDown();
});


// optional: hoch (z.B. für später Rotation)
document.querySelector(".up").addEventListener("click", () => {
  alert("Rotation kommt später");
});

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    if (block.x > 0) block.x--;
  }

  if (e.key === "ArrowRight") {
    if (block.x + block.shape[0].length < cols) block.x++;
  }

  if (e.key === "ArrowDown") {
    moveDown();
    return;
  }

  drawBoard();
});



function moveDown() {
  if (canMoveDown()) {
    block.y++;
  } else {
    freezeBlock();
    createNewBlock();
    if (!canCreateBlock()) {
      gameOver();
      return;
    }
  }
  drawBoard();
}

function freezeBlock() {
  for (let row = 0; row < block.shape.length; row++) {
    for (let col = 0; col < block.shape[row].length; col++) {
      if (block.shape[row][col] === 1) {
        const x = block.x + col;
        const y = block.y + row;

        board[y][x] = 1;
      }
    }
  }
}

let timerId = setInterval(moveDown, 200);

function gameOver() {
  alert("Game Over!");
  clearInterval(timerId);
}

