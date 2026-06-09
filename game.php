<?php
$pageTitle = "Blox Game";
include "includes/header.php";
?>

<div class="container">
  <h1 class="title">BLOX</h1>
  <div id="countdown-overlay"></div>
  <div id="game-over-overlay">
    <div class="game-over-box">
      <h2>Game Over</h2>
      <p>Final Score: <span id="final-score">0</span></p>
      <button type="button" id="restart-button">Restart</button>
    </div>
  </div>

  <div class="game-wrapper">

    <aside class="sidebar hold-sidebar">
      <div class="panel hold">
        <h2>HOLD</h2>
        <div id="hold-grid"></div>
      </div>
      <div class="key-panel hold-button">
        <span class="key-label">SHIFT</span>
        <span>HOLD PIECE</span>
      </div>
    </aside>

    <div class="center-area">
      <div class="grid" id="grid"></div>

      <div class="key-panel hard-drop-button">
        <span class="key-label">SPACE</span>
        <span>HARD DROP</span>
      </div>
    </div>

    <aside class="sidebar info-sidebar">
      <div class="panel next">
        <h2>NEXT</h2>
        <div id="next-grid"></div>
      </div>
      <div class="panel score">
        <h2>Score</h2>
        <p id="score">0</p>
      </div>

      <div class="panel button">
        <button type="button" id="start-button">Play</button>
        <button type="button" id="pause-button">Pause</button>
        <button type="button" id="reset-button">Reset</button>
      </div>

      <div class="controls">
        <button class="arrow up">▲</button>

        <div class="middle">
          <button class="arrow left">◀</button>
          <button class="arrow down">▼</button>
          <button class="arrow right">▶</button>
        </div>
      </div>
    </aside>
  </div>
</div>

<audio id="bgm" loop>
  <source src="audio/bgm1.mp3" type="audio/mpeg">
  <!-- <source src="audio/bgm2.mp3" type="audio/mpeg"> -->
  <!-- <source src="audio/bgm3.mp3" type="audio/mpeg"> -->
</audio>

<!--js Files müssen in dieser Reihenfolge geladen werden -->
<script src="/Blox/js/data.js?v=<?php echo time(); ?>"></script>
<script src="/Blox/js/render.js?v=<?php echo time(); ?>"></script>
<script src="/Blox/js/logic.js?v=<?php echo time(); ?>"></script>
<script src="/Blox/js/gameState.js?v=<?php echo time(); ?>"></script>
<script src="/Blox/js/game.js?v=<?php echo time(); ?>"></script>

<?php include "includes/footer.php"; ?>