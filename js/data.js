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

let holdShape = null;
let canHold = true;

const shapes = [
  {
    name: "O",
    color: "yellow",
    shape: [
      [1, 1],
      [1, 1],
    ],
  },
  {
    name: "I",
    color: "cyan",
    shape: [[1], [1], [1], [1]],
  },
  {
    name: "L",
    color: "orange",
    shape: [
      [1, 0],
      [1, 0],
      [1, 1],
    ],
  },
  {
    name: "J",
    color: "blue",
    shape: [
      [0, 1],
      [0, 1],
      [1, 1],
    ],
  },
  {
    name: "T",
    color: "purple",
    shape: [
      [1, 1, 1],
      [0, 1, 0],
    ],
  },
  {
    name: "Z",
    color: "red",
    shape: [
      [1, 1, 0],
      [0, 1, 1],
    ],
  },
  {
    name: "S",
    color: "green",
    shape: [
      [0, 1, 1],
      [1, 1, 0],
    ],
  },
];