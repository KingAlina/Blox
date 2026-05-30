function getRandomShape() {
  const randomIndex = Math.floor(Math.random() * shapes.length);
  return shapes[randomIndex];
}

function createNewBlock() {
  const randomShape = nextShape;
  nextShape = getRandomShape();

  block = {
    shape: randomShape,
    x: Math.floor((cols - randomShape[0].length) / 2),
    y: 0,
  };

  drawNextShape();
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

function getGhostY() {
  let ghostY = block.y;

  while (true) {
    let canMove = true;

    for (let row = 0; row < block.shape.length; row++) {
      for (let col = 0; col < block.shape[row].length; col++) {
        if (block.shape[row][col] === 1) {
          const x = block.x + col;
          const newY = ghostY + row + 1;

          if (newY >= rows || board[newY][x] === 1) {
            canMove = false;
          }
        }
      }
    }

    if (!canMove) {
      break;
    }

    ghostY++;
  }

  return ghostY;
}

function canMoveLeft() {
  for (let row = 0; row < block.shape.length; row++) {
    for (let col = 0; col < block.shape[row].length; col++) {
      if (block.shape[row][col] === 1) {
        const newX = block.x + col - 1;
        const y = block.y + row;

        if (newX < 0 || board[y][newX] === 1) {
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
        const newX = block.x + col + 1;
        const y = block.y + row;

        if (newX >= cols || board[y][newX] === 1) {
          return false;
        }
      }
    }
  }

  return true;
}

function canControlGame() {
  return isGameRunning && !isPaused && !isCountdownRunning && block;
}

function moveLeft() {
  if (!canControlGame()) return;

  if (canMoveLeft()) {
    block.x--;
    drawBoard();
  }
}

function moveRight() {
  if (!canControlGame()) return;

  if (canMoveRight()) {
    block.x++;
    drawBoard();
  }
}

function moveDown() {
  if (!canControlGame()) return;

  if (canMoveDown()) {
    block.y++;
  } else {
    freezeBlock();
    clearLines();
    createNewBlock();

    if (!canCreateBlock()) {
      gameOver();
      return;
    }
  }

  drawBoard();
}

function hardDrop() {
  if (!canControlGame()) return;

  while (canMoveDown()) {
    block.y++;
  }

  freezeBlock();
  clearLines();
  createNewBlock();

  if (!canCreateBlock()) {
    gameOver();
    return;
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

function getRotatedShape(shape) {
  const rotatedShape = [];

  for (let col = 0; col < shape[0].length; col++) {
    const newRow = [];

    for (let row = shape.length - 1; row >= 0; row--) {
      newRow.push(shape[row][col]);
    }

    rotatedShape.push(newRow);
  }

  return rotatedShape;
}

function canRotate(shape) {
  for (let row = 0; row < shape.length; row++) {
    for (let col = 0; col < shape[row].length; col++) {
      if (shape[row][col] === 1) {
        const x = block.x + col;
        const y = block.y + row;

        if (x < 0 || x >= cols || y >= rows) {
          return false;
        }

        if (board[y][x] === 1) {
          return false;
        }
      }
    }
  }

  return true;
}

function rotateBlock() {
  if (!canControlGame()) return;

  const rotatedShape = getRotatedShape(block.shape);

  if (canRotate(rotatedShape)) {
    block.shape = rotatedShape;
    drawBoard();
  }
}

function clearLines() {
  let clearedLines = 0;

  for (let row = 0; row < rows; row++) {
    if (board[row].every((cell) => cell === 1)) {
      board.splice(row, 1);
      board.unshift(Array(cols).fill(0));
      clearedLines++;
    }
  }

  score += points[clearedLines];
  scoreElement.textContent = score;

  totalLinesCleared += clearedLines;

  if (totalLinesCleared % 5 === 0 && totalLinesCleared > 0 && gameSpeed > 175) {
    clearInterval(timerId);
    gameSpeed -= 75;
    timerId = setInterval(moveDown, gameSpeed);
  }
}