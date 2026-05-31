function drawBoard() {
  cells.forEach((cell) => {
    cell.classList.remove("filled", "ghost", "clearing");
  });

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (board[y][x] === 1) {
        const index = y * cols + x;
        cells[index].classList.add("filled");
      }
    }
  }

  if (block) {
    const ghostY = getGhostY();

    for (let row = 0; row < block.shape.length; row++) {
      for (let col = 0; col < block.shape[row].length; col++) {
        if (block.shape[row][col] === 1) {
          const x = block.x + col;
          const y = ghostY + row;
          const index = y * cols + x;

          cells[index].classList.add("ghost");
        }
      }
    }

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
}

function drawNextShape() {
  nextCells.forEach((cell) => {
    cell.classList.remove("filled");
  });
  const offsetX = Math.floor((4 - nextShape[0].length) / 2);
  const offsetY = Math.floor((4 - nextShape.length) / 2);
  for (let row = 0; row < nextShape.length; row++) {
    for (let col = 0; col < nextShape[row].length; col++) {
      if (nextShape[row][col] === 1) {
        const index = (row + offsetY) * 4 + (col + offsetX);
        nextCells[index].classList.add("filled");
      }
    }
  }
}