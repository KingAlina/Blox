<?php
$pageTitle = "Blox Game";
include "includes/header.php";
?>



<div class="container">
  <h1 class="title">BLOX</h1>

  <div class="game-wrapper">

    <aside class="sidebar hold-sidebar">
      <div class="panel hold">
        <h2>HOLD</h2>
        <div id="hold-grid"></div>
      </div>
    </aside>

    <div class="grid" id="grid">

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
        <button type="button">Start</button>
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

<script src="js/game.js"></script>

<?php include "includes/footer.php"; ?>