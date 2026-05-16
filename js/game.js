const rows = 20;
const cols = 10;
const board = Array.from({ length: rows }, () => Array(cols).fill(0)); //nur logisch nicht visuell, 2D

//let gameOver = false;

//To Do: Interface?
let block;
let nextShape;

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

const nextGrid = document.getElementById("next-grid");
// 16 Zellen Vorschau
for(let i = 0; i < 16; i++){
  const cell = document.createElement("div");
  cell.classList.add("cell");
  nextGrid.appendChild(cell);
}


const cells = Array.from(grid.children); //visuelle Darstellung mittels 1D Array
const nextCells = Array.from(nextGrid.children);

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

function drawNextShape(){
  nextCells.forEach((cell) => 
    {cell.classList.remove("filled");});

  //Offset, damit Block mittig platziert werden kann
  const offsetX = Math.floor((4 - nextShape[0].length) / 2);
  const offsetY = Math.floor((4 - nextShape.length) / 2);

  for(let row = 0; row < nextShape.length; row++){
    for(let col = 0; col < nextShape[row].length; col++){
      if(nextShape[row][col] === 1){
        const index = (row + offsetY) * 4 + (col + offsetX);
        nextCells[index].classList.add("filled");
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

function getRandomShape(){
  const randomIndex = Math.floor(Math.random() * shapes.length); //Zahl zwischen 0 und 6
  const randomShape = shapes[randomIndex];
  return randomShape
}

function createNewBlock() {
  const randomShape = nextShape;
  nextShape = getRandomShape();
  block = {
    shape: randomShape,
    x: Math.floor((cols - randomShape[0].length) / 2), //platziert den Stein mittig im Verhältnis zu seiner Breite
    y: 0,
  };
  drawNextShape();
}



//Spielstart, TODO: start/pause button
nextShape = getRandomShape();
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

function canMoveLeft(){
  //Form durchgehen, Zeilen, Spalten
  for (let row = 0; row < block.shape.length; row++){
    for(let col = 0; col < block.shape[row].length; col++){
      //wenn Feld gefüllt
      if(block.shape[row][col] === 1){
        const newX = block.x + col - 1;
        const y = block.y + row;
        if(newX < 0){
          return false //links ist Wand
        }
        if(board[y][newX] === 1){
          return false //links ist Block
        }
      }
    }
  }
  return true; 
}

function canMoveRight(){
  for(let row = 0; row < block.shape.length; row++){
    for(let col = 0; col < block.shape[row].length; col++){
      if(block.shape[row][col] === 1){//Feld gefüllt
        const newX = block.x + col + 1;
        const y = block.y + row;
        if(newX >= cols){
          return false //rechts ist Wand
        }
        if(board[y][newX] === 1){
          return false //rechts ist Block
        }
      }
    }
  }
  return true;
}

document.querySelector(".left").addEventListener("click", () => {
  moveLeft();
});

document.querySelector(".right").addEventListener("click", () => {
  moveRight();
});

document.querySelector(".down").addEventListener("click", () => {
  moveDown();
});

// optional: hoch (z.B. für später Rotation)
document.querySelector(".up").addEventListener("click", () => {
  rotateBlock();
});

document.addEventListener("keydown", (e) => {
  e.preventDefault();
  if (e.key === "ArrowLeft") {
    moveLeft();
  }

  if (e.key === "ArrowRight") {
    moveRight();
  }

  if (e.key === "ArrowUp"){
    rotateBlock();
  }

  if (e.key === "ArrowDown") {
    moveDown();
  }
});

function moveLeft(){
  if(canMoveLeft()){
    block.x--;
    drawBoard();
  }
}

function moveRight(){
  if(canMoveRight()){
    block.x++;
    drawBoard();
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

let timerId = setInterval(moveDown, 1000);

function gameOver() {
  alert("Game Over!");
  clearInterval(timerId);
}

//Rotation erstellen
function getRotatedShape(shape){
  const rotatedShape = [];
  //Spalten werden neue Zeilen
  for(let col = 0; col < shape[0].length; col++){
    const newRow = [];
    //letzer Zeileneintrag in Spalte wird erster Spalteneintrag in Zeile
    for(let row = shape.length - 1; row >= 0; row--){
      newRow.push(shape[row][col]);
    }
    rotatedShape.push(newRow);
  }
  return rotatedShape;
}

//Rotation ohne Kollision möglich
function canRotate(shape){
  for(let row = 0; row < shape.length; row++){
    for(let col = 0; col < shape[row].length; col++){
      if(shape[row][col] === 1){ //nur prüfen wenn Form dort ist
        const x = block.x + col;
        const y = block.y + row;  //neue Position im Board
        if(x < 0 || x >= cols || y >= rows){ //außerhalb von Board
          return false 
        }
        if(board[y][x] === 1){ //Kollision mit Block
          return false;
        }
      }
    }
  }
  return true;
}

//Block wird rotiert
function rotateBlock(){
  const rotatedShape = getRotatedShape(block.shape);

  if(canRotate(rotatedShape)){
    block.shape = rotatedShape;
    drawBoard();
  }
}