<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

if (!isset($pageTitle)) {
    $pageTitle = "Blox";
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= htmlspecialchars($pageTitle) ?></title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/Blox/css/game.css?v=<?php echo time(); ?>">
</head>
<body>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4 w-100">
  <div class="container-fluid">
        <a class="navbar-brand" href="index.php">Blox</a>

        <div class="navbar-nav">
            <a class="nav-link" href="index.php">Home</a>
            <a class="nav-link" href="game.php">Game</a>
            <a class="nav-link" href="leaderboard.php">Leaderboard</a>
            <a class="nav-link" href="login.php">Login</a>
            <a class="nav-link" href="register.php">Register</a>
        </div>
    </div>
</nav>