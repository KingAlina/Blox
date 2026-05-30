const rows = 20;
const cols = 10;
const board = Array.from({ length: rows }, () => Array(cols).fill(0)); //nur logisch nicht visuell, 2D
let score = 0;
let points = [0, 100, 300, 500, 800];
let totalLinesCleared = 0;
let gameSpeed = 1000;
let isGameRunning = false;
let isPaused = false;
let timerId = null;
let isCountdownRunning = false;
const countdown = document.getElementById("countdown-overlay");
const gameOverOverlay = document.getElementById("game-over-overlay");
const finalScore = document.getElementById("final-score");

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

function initGame(){
  nextShape = getRandomShape();
  drawNextShape();
  drawBoard();

  document.getElementById("start-button").addEventListener("click", startGame);
  document.getElementById("pause-button").addEventListener("click", pauseGame);
  document.getElementById("reset-button").addEventListener("click", resetGame);
}

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

function drawBoard() {
  // alles leeren
  cells.forEach((cell) => {
    cell.classList.remove("filled", "ghost");
  });
  // feste Blöcke im Board
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {

      if (board[y][x] === 1) {
        const index = y * cols + x;
        cells[index].classList.add("filled");
      }
    }
  }
  // Ghost + echter Block
  if (block) {
    // Ghost Position berechnen
    const ghostY = getGhostY();
    // Ghost zeichnen
    for (let row = 0; row < block.shape.length; row++) {
      for (let col = 0; col < block.shape[row].length; col++) {
        if (block.shape[row][col] === 1) {
          const x = block.x + col;
          const y = ghostY + row;
          const index = y * cols + x;
          // nicht über feste Blöcke zeichnen
          const realX = block.x + col;
          const realY = block.y + row;
          if (x !== realX || y !== realY) {
            cells[index].classList.add("ghost");
          }
        }
      }
    }
    // echten Block zeichnen
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

function getGhostY(){
  let ghostY = block.y;
  while(true){
    let canMove = true;
    for(let row = 0; row < block.shape.length; row++){
      for(let col = 0; col < block.shape[row].length; col++){
        if(block.shape[row][col] === 1){
          const x = block.x + col;
          const newY = ghostY + row + 1;

          if(newY >= rows || board[newY][x] === 1){
            canMove = false;
          }
        }
      }
    }
    if(!canMove){
      break;
    }
    ghostY++;
  }
  return ghostY;
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

  if(e.code === "Space"){
    hardDrop();
  }
});

function moveLeft(){
  if(isCountdownRunning){
    return;
  }
  if(canMoveLeft()){
    block.x--;
    drawBoard();
  }
}

function moveRight(){
  if(isCountdownRunning){
    return;
  }
  if(canMoveRight()){
    block.x++;
    drawBoard();
  }
}

function moveDown() {
  if(isCountdownRunning){
    return;
  }
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

function hardDrop(){
  if(isCountdownRunning){
    return;
  }
  while(canMoveDown()){
    block.y++;
  }
  freezeBlock();
  clearLines();
  createNewBlock();
  if(!canCreateBlock()){
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

function startGame(){
  if(isGameRunning && !isPaused){
    return;
  }
  if(!block){
    createNewBlock();
    drawBoard();
  }
  clearInterval(timerId);
  isGameRunning = true;
  isPaused = false;
  showCountdown();
}

function pauseGame(){
  if(!isGameRunning || isPaused || isCountdownRunning){
    return;
  }
  clearInterval(timerId);
  timerId = null;
  isPaused = true;
}

function resetGame(){
  clearInterval(timerId);
  timerId = null;
  isGameRunning = false;
  isPaused = false;
  block = null;

  for(let row = 0; row < rows; row++){
    board[row].fill(0);
  }
  score = 0;
  totalLinesCleared = 0;
  gameSpeed = 1000;
  document.getElementById("score").textContent = score;
  nextShape = getRandomShape();
  drawNextShape();
  drawBoard();
}

function showCountdown(){
  isCountdownRunning = true;
  countdown.style.display = "flex";
  countdown.textContent = "3";
  setTimeout(() => {
    countdown.textContent = "2";
  }, 1000);
  setTimeout(() => {
    countdown.textContent = "1";
  }, 2000);
  setTimeout(() => {
    countdown.textContent = "GO";
  }, 3000);
  setTimeout(() => {
    countdown.style.display = "none";
    isCountdownRunning = false;
    timerId = setInterval(moveDown, gameSpeed);
  }, 4000);
}

document.getElementById("restart-button").addEventListener("click", () => {
  gameOverOverlay.style.display = "none";
  resetGame();
  startGame();
});

function gameOver() {
  clearInterval(timerId);
  timerId = null;

  isGameRunning = false;
  isPaused = false;

  finalScore.textContent = score;
  gameOverOverlay.style.display = "flex";
  saveScore(score);
}

//Backend-Anbindung vorbereitet, TODO
async function saveScore(score) {

  const response = await fetch("save_score.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      score: score
    })
  });

  const data = await response.json();
  console.log(data);
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
  if(isCountdownRunning){
    return;
  }
  const rotatedShape = getRotatedShape(block.shape);

  if(canRotate(rotatedShape)){
    block.shape = rotatedShape;
    drawBoard();
  }
}

//Punktesystem: 1 Reihe = 100 Punkte, 2 Reihen = 300 Punkte, 3 Reihen = 500 Punkte, 4 Reihen = 800 Punkte

function clearLines(){
  let clearedLines = 0;
  for(let row = 0; row < rows; row++){
    if(board[row].every(cell => cell === 1)){ //prüft ob alle Felder === 1 sind
      board.splice(row, 1); //Reihe löschen
      board.unshift(Array(cols).fill(0)); //neue Reihe mit 0 gefüllt
      clearedLines++;
    }
  }
  score += points[clearedLines];  //clearedLines werden Array Index
  document.getElementById("score").textContent = score; //anzeigen
  totalLinesCleared += clearedLines;
  if(totalLinesCleared % 5 === 0 && totalLinesCleared > 0 && gameSpeed > 175){//alle 5 gelöschten Reihen Level Up
    clearInterval(timerId);
    gameSpeed -= 75;
    timerId = setInterval(moveDown, gameSpeed);
  }
}

initGame();