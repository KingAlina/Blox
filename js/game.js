const countdown = document.getElementById("countdown-overlay");
const gameOverOverlay = document.getElementById("game-over-overlay");
const finalScore = document.getElementById("final-score");
const scoreElement = document.getElementById("score");
const bgm = document.getElementById("bgm");

const grid = document.getElementById("grid");

for (let i = 0; i < rows * cols; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  grid.appendChild(cell);
}

const nextGrid = document.getElementById("next-grid");

for (let i = 0; i < 16; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  nextGrid.appendChild(cell);
}

const cells = Array.from(grid.children);
const nextCells = Array.from(nextGrid.children);

const holdGrid = document.getElementById("hold-grid");

for (let i = 0; i < 16; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  holdGrid.appendChild(cell);
}

const holdCells = Array.from(holdGrid.children);


function initGame() {
  nextShape = getRandomShape();
  drawNextShape();

  document.querySelector(".left").addEventListener("click", moveLeft);
  document.querySelector(".right").addEventListener("click", moveRight);
  document.querySelector(".down").addEventListener("click", moveDown);
  document.querySelector(".up").addEventListener("click", rotateBlock);

  document.getElementById("start-button").addEventListener("click", startGame);
  document.getElementById("pause-button").addEventListener("click", pauseGame);
  document.getElementById("reset-button").addEventListener("click", resetGame);

  document.getElementById("restart-button").addEventListener("click", () => {
    gameOverOverlay.style.display = "none";
    resetGame();
    startGame();
  });

  document.addEventListener("keydown", (e) => {
    e.preventDefault();

    if (e.key === "ArrowLeft") {
      moveLeft();
    }

    if (e.key === "ArrowRight") {
      moveRight();
    }

    if (e.key === "ArrowUp") {
      rotateBlock();
    }

    if (e.key === "ArrowDown") {
      moveDown();
    }

    if (e.code === "Space") {
      hardDrop();
    }

    if (e.key === "Shift") {
      holdBlock();
    }
  });
}

initGame();