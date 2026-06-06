
//console.log(cells);
function drawBoard() {
  if (!block) {
    return;
  }
  //alles leeren
  cells.forEach((cell) => {
    cell.classList.remove("filled");
    cell.className = "cell";
  });
  const ghostY = getGhostY();

  for (let row = 0; row < block.shape.length; row++) {
    for (let col = 0; col < block.shape[row].length; col++) {
      if (block.shape[row][col] !== 0) {
        const x = block.x + col;
        const y = ghostY + row;
        const index = y * cols + x;

        if (cells[index]) {
          cells[index].classList.add("ghost");
        }
      }
    }
  }

  //feste Blöcke im Board
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (board[y][x] !== 0) {
        const index = y * cols + x;
        cells[index].classList.add("filled", board[y][x]);
      }
    }
  }
  // aktuell fallender Block
  for (let row = 0; row < block.shape.length; row++) {
    for (let col = 0; col < block.shape[row].length; col++) {
      if (block.shape[row][col] !== 0) {
        const x = block.x + col;
        const y = block.y + row;
        const index = y * cols + x;
        cells[index].classList.add("filled", block.color);
      }
    }
  }
}

function drawNextShape() {
  nextCells.forEach((cell) => {
    cell.className = "cell";
  });

  const shape = nextShape.shape;
  const color = nextShape.color;

  //Offset, damit Block mittig platziert werden kann
  const offsetX = Math.floor((4 - shape[0].length) / 2);
  const offsetY = Math.floor((4 - shape.length) / 2);

  for (let row = 0; row < shape.length; row++) {
    for (let col = 0; col < shape[row].length; col++) {
      if (shape[row][col] !== 0) {
        const index = (row + offsetY) * 4 + (col + offsetX);
        nextCells[index].classList.add("filled", color);
      }
    }
  }
}

function drawHoldShape() {
  holdCells.forEach((cell) => {
    cell.className = "cell";
  });

  if (holdShape === null) return;

  const shape = holdShape.shape;
  const color = holdShape.color;

  const offsetX = Math.floor((4 - shape[0].length) / 2);
  const offsetY = Math.floor((4 - shape.length) / 2);

  for (let row = 0; row < shape.length; row++) {
    for (let col = 0; col < shape[row].length; col++) {
      if (shape[row][col] !== 0) {
        const index = (row + offsetY) * 4 + (col + offsetX);
        holdCells[index].classList.add("filled", color);
      }
    }
  }
}