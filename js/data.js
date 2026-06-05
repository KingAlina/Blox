const rows = 20;
const cols = 10;
const board = Array.from({ length: rows }, () => Array(cols).fill(0));

let score = 0;
let points = [0, 100, 300, 500, 800];
let totalLinesCleared = 0;
let gameSpeed = 1000;

let isGameRunning = false;
let isPaused = false;
let isCountdownRunning = false;
let timerId = null;
let countdownTimeouts = [];

let block = null;
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