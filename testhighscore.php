<?php
require_once('dbaccess.php');

$db_obj = new mysqli($host, $user, $password, $database);
if ($db_obj->connect_error) {
echo "Connection Error: " . $db_obj->connect_error;
exit();
}
$sql = "SELECT Punktezahl, Player, Datum FROM highscores ORDER BY Punktezahl DESC";
$stmt = $db_obj->prepare($sql);
$stmt->execute();
$stmt->bind_result($Punktezahl, $Player, $Datum);
?>


<!DOCTYPE html>

<html>
<head>
<meta charset="UTF-8">
<title>Highscores</title>

<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
</head>
<body>
    <div class="container mt-5">
    <h1> Highscores</h1>

    <table class="table table-striped mt-4">
        <thead class="table-dark">
            <tr>
                <th>Punkte</th>
                <th>Spieler</th>                
                <th>Datum</th>
            </tr>
        </thead>
        <tbody>

        <?php
        
            while($stmt->fetch()) {
                echo "<tr>";
                echo "<td>" . $Punktezahl . "</td>";
                echo "<td>" . htmlspecialchars($Player) . "</td>";                
                echo "<td>" . $Datum . "</td>";
                echo "</tr>";
            }
        $stmt->close();
        $db_obj->close();
        ?>

        </tbody>
    </table>
</div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</body>
</html>