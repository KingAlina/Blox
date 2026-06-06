<?php
$pageTitle = "Blox Home";
include "includes/header.php";
?>

<div class="game-container">
  <h1 class="title">Willkommen bei BLOX</h1>

  <div class="panel">
    <h2>Spiele ein klassisches Blockspiel direkt im Browser</h2>
    <p>
      BLOX ist ein simples webbasiertes Spiel, bei dem du Blöcke bewegen,
      drehen und Reihen vervollständigen kannst, um Punkte zu sammeln.
    </p>

    <div style="margin-top: 25px;">
      <a href="game.php">
        <button type="button">Spiel starten</button>
      </a>

      <a href="register.php">
        <button type="button">Registrieren</button>
      </a>
    </div>
  </div>

<?php include "includes/footer.php"; ?>