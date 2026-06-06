function getRandomShape() {
  const randomIndex = Math.floor(Math.random() * shapes.length);
  return shapes[randomIndex];
}

function createNewBlock(shape = nextShape) {
  const newShape = shape;

  if (shape === nextShape) {
    nextShape = getRandomShape();
  }

  block = {
    shape: newShape.shape,
    color: newShape.color,
    x: Math.floor((cols - newShape.shape[0].length) / 2),
    y: 0,
  };

  drawNextShape();
}

function canCreateBlock() {
  for (let row = 0; row < block.shape.length; row++) {
    for (let col = 0; col < block.shape[row].length; col++) {
      if (block.shape[row][col] !== 0) {
        const x = block.x + col;
        const y = block.y + row;

        if (board[y][x] !== 0) {
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
      if (block.shape[row][col] !== 0) {
        const x = block.x + col;
        const newY = block.y + row + 1;

        if (newY >= rows || board[newY][x] !== 0) {
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
        if (block.shape[row][col] !== 0) {
          const x = block.x + col;
          const newY = ghostY + row + 1;

          if (newY >= rows || board[newY][x] !== 0) {
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
      if (block.shape[row][col] !== 0) {
        const newX = block.x + col - 1;
        const y = block.y + row;

        if (newX < 0 || board[y][newX] !== 0) {
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
      if (block.shape[row][col] !== 0) {
        const newX = block.x + col + 1;
        const y = block.y + row;

        if (newX >= cols || board[y][newX] !== 0) {
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
    drawBoard();
  } else {
    freezeBlock();
    canHold = true;
    const linesWereCleared = clearLines();
    createNewBlock();

    if (!canCreateBlock()) {
      gameOver();
      return;
    }
    if(!linesWereCleared){
      drawBoard();
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
  canHold = true;
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
      if (block.shape[row][col] !== 0) {
        const x = block.x + col;
        const y = block.y + row;

        board[y][x] = block.color;
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
      if (shape[row][col] !== 0) {
        const x = block.x + col;
        const y = block.y + row;

        if (x < 0 || x >= cols || y >= rows) {
          return false;
        }

        if (board[y][x] !== 0) {
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
  // 1. normale Rotation versuchen
  if (canRotate(rotatedShape)) {
    block.shape = rotatedShape;
    drawBoard();
    return;
  }
  // 2. Wall Kicks versuchen
  const kicks = [-1, 1, -2, 2, -3, 3];
  for (let kick of kicks) {
    block.x += kick;

    if (canRotate(rotatedShape)) {
      block.shape = rotatedShape;
      drawBoard();
      return;
    }
    block.x -= kick;
  }
}

function clearLines() {
  const fullRows = [];

  for (let row = 0; row < rows; row++) {
    if(board[row].every(cell => cell !== 0)) {
      fullRows.push(row);
    }
  }

  if (fullRows.length === 0) {
    return false;
  }

  // Animation anzeigen
  fullRows.forEach((row) => {
    for (let col = 0; col < cols; col++) {
      const index = row * cols + col;
      cells[index].style.backgroundColor = "#cfe8ff";
      cells[index].style.animation = "clearFlash 3s infinite";
    }
  });
   // Browser zwingt zum Rendern
   void grid.offsetHeight;

  // Nach kurzer Zeit wirklich löschen
  setTimeout(() => {
    fullRows.forEach((row) => {
      board.splice(row, 1);
      board.unshift(Array(cols).fill(0));
    });

    score += points[fullRows.length];
    scoreElement.textContent = score;
    totalLinesCleared += fullRows.length;
    if (totalLinesCleared % 5 === 0 && totalLinesCleared > 0 && gameSpeed > 175) {
      clearInterval(timerId);
      gameSpeed -= 75;
      timerId = setInterval(moveDown, gameSpeed);
    }
    cells.forEach((cell) => {
      cell.style.backgroundColor = "";
      cell.style.animation = "";
    });
    drawBoard();
  }, 200);
  return true;
}

function holdBlock() {
  if (!canHold) return;

  const currentBlock = {
    shape: block.shape,
    color: block.color,
  };

  if (holdShape === null) {
    holdShape = currentBlock;
    createNewBlock();
  } else {
    const temp = holdShape;
    holdShape = currentBlock;
    createNewBlock(temp);
  }

  canHold = false;
  drawHoldShape();
  drawBoard();
}