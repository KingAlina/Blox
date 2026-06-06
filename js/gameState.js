function startGame() {
  if (isGameRunning && !isPaused) {
    return;
  }

  if (isPaused) {
    isPaused = false;
    clearInterval(timerId);
    showCountdown();
    return;
  }

  if (!block) {
    createNewBlock();
    drawBoard();
  }

  clearInterval(timerId);

  isGameRunning = true;
  isPaused = false;

  showCountdown();
}

function pauseGame() {
  if (!isGameRunning || isPaused || isCountdownRunning) {
    return;
  }

  clearInterval(timerId);
  timerId = null;
  isPaused = true;
}

function resetGame() {
  clearInterval(timerId);
  clearCountdownTimers();

  timerId = null;
  isGameRunning = false;
  isPaused = false;
  isCountdownRunning = false;
  block = null;
  holdShape = null;
  canHold = true;

  countdown.style.display = "none";
  gameOverOverlay.style.display = "none";

  for (let row = 0; row < rows; row++) {
    board[row].fill(0);
  }

  cells.forEach((cell) => {
    cell.className = "cell";
    cell.style.backgroundColor = "";
    cell.style.animation = "";
  });

  score = 0;
  totalLinesCleared = 0;
  gameSpeed = 1000;

  scoreElement.textContent = score;

  nextShape = getRandomShape();
  drawNextShape();
  drawHoldShape();
}

function showCountdown() {
  clearCountdownTimers();

  isCountdownRunning = true;
  countdown.style.display = "flex";
  countdown.textContent = "3";

  countdownTimeouts.push(setTimeout(() => {
    countdown.textContent = "2";
  }, 1000));

  countdownTimeouts.push(setTimeout(() => {
    countdown.textContent = "1";
  }, 2000));

  countdownTimeouts.push(setTimeout(() => {
    countdown.textContent = "GO";
  }, 3000));

  countdownTimeouts.push(setTimeout(() => {
    countdown.style.display = "none";
    isCountdownRunning = false;
    timerId = setInterval(moveDown, gameSpeed);
  }, 4000));
}

function clearCountdownTimers() {
  countdownTimeouts.forEach((timeoutId) => {
    clearTimeout(timeoutId);
  });

  countdownTimeouts = [];
}

function gameOver() {
  clearInterval(timerId);
  timerId = null;

  isGameRunning = false;
  isPaused = false;
  isCountdownRunning = false;

  finalScore.textContent = score;
  gameOverOverlay.style.display = "flex";

  saveScore(score);
}

async function saveScore(score) {
  try {
    const response = await fetch("save_score.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ score: score }),
    });

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log("Score could not be saved yet:", error);
  }
}