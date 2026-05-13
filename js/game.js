console.log("Blox game.js loaded");

const rows = 20;
const cols = 10;
const board = Array.from({ length: rows }, () => Array(cols).fill(0));

let block;
let timerId = null;
let gameStarted = false;

const shapes = [
  [[1, 1], [1, 1]],
  [[1], [1], [1], [1]],
  [[1, 0], [1, 0], [1, 1]],
  [[0, 1], [0, 1], [1, 1]],
  [[1, 1, 1], [0, 1, 0]],
  [[1, 1, 0], [0, 1, 1]],
  [[0, 1, 1], [1, 1, 0]]
];

const grid = document.getElementById("grid");

for (let i = 0; i < rows * cols; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  grid.appendChild(cell);
}

const cells = Array.from(grid.children);

function createNewBlock() {
  const randomIndex = Math.floor(Math.random() * shapes.length);
  const randomShape = shapes[randomIndex];

  block = {
    shape: randomShape,
    x: Math.floor((cols - randomShape[0].length) / 2),
    y: 0
  };
}

function drawBoard() {
  cells.forEach(cell => cell.classList.remove("filled"));

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (board[y][x] === 1) {
        cells[y * cols + x].classList.add("filled");
      }
    }
  }

  for (let row = 0; row < block.shape.length; row++) {
    for (let col = 0; col < block.shape[row].length; col++) {
      if (block.shape[row][col] === 1) {
        const x = block.x + col;
        const y = block.y + row;

        if (x >= 0 && x < cols && y >= 0 && y < rows) {
          cells[y * cols + x].classList.add("filled");
        }
      }
    }
  }
}

function canCreateBlock() {
  for (let row = 0; row < block.shape.length; row++) {
    for (let col = 0; col < block.shape[row].length; col++) {
      if (block.shape[row][col] === 1) {
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

function canMoveDown() {
  for (let row = 0; row < block.shape.length; row++) {
    for (let col = 0; col < block.shape[row].length; col++) {
      if (block.shape[row][col] === 1) {
        const x = block.x + col;
        const newY = block.y + row + 1;

        if (newY >= rows || board[newY][x] === 1) {
          return false;
        }
      }
    }
  }
  return true;
}

function canMoveLeft() {
  for (let row = 0; row < block.shape.length; row++) {
    for (let col = 0; col < block.shape[row].length; col++) {
      if (block.shape[row][col] === 1) {
        const x = block.x + col - 1;
        const y = block.y + row;

        if (x < 0 || board[y][x] === 1) {
          return false;
        }
      }
    }
  }
  return true;
}

function canMoveRight() {
  for (let row = 0; row < block.shape.length; row++) {
    for (let col = 0; col < block.shape[row].length; col++) {
      if (block.shape[row][col] === 1) {
        const x = block.x + col + 1;
        const y = block.y + row;

        if (x >= cols || board[y][x] === 1) {
          return false;
        }
      }
    }
  }
  return true;
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

function moveLeft() {
  if (canMoveLeft()) {
    block.x--;
    drawBoard();
  }
}

function moveRight() {
  if (canMoveRight()) {
    block.x++;
    drawBoard();
  }
}

function startGame() {
  if (!gameStarted) {
    timerId = setInterval(moveDown, 200);
    gameStarted = true;
  }
}

function pauseGame() {
  clearInterval(timerId);
  timerId = null;
  gameStarted = false;
}

function resetGame() {
  clearInterval(timerId);
  timerId = null;
  gameStarted = false;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      board[y][x] = 0;
    }
  }

  createNewBlock();
  drawBoard();
}

function gameOver() {
  clearInterval(timerId);
  timerId = null;
  gameStarted = false;
  alert("Game Over!");
}

document.querySelector(".left").addEventListener("click", moveLeft);
document.querySelector(".right").addEventListener("click", moveRight);
document.querySelector(".down").addEventListener("click", moveDown);

document.querySelector(".up").addEventListener("click", () => {
  alert("Rotation kommt später");
});

document.getElementById("startBtn").addEventListener("click", startGame);
document.getElementById("pauseBtn").addEventListener("click", pauseGame);

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") moveLeft();
  if (event.key === "ArrowRight") moveRight();
  if (event.key === "ArrowDown") moveDown();
  if (event.key === " ") startGame();
});

createNewBlock();
drawBoard();