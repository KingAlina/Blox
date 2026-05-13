<?php
$pageTitle = "Blox Game";
include "includes/header.php";
?>

<main class="container">
    <h1 class="title">BLOX</h1>

    <div class="game-wrapper">
        <div id="grid"></div>

        <aside class="sidebar">
            <div class="panel">
                <h2>Score</h2>
                <p id="score">0</p>
            </div>

            <div class="panel">
                <button id="startBtn" type="button">Start</button>
                <button id="pauseBtn" type="button">Pause</button>
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
</main>

<script src="js/game.js"></script>
<?php include "includes/footer.php"; ?>