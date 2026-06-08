<?php
session_start();

if (!isset($_SESSION["playerid"])) {
    echo json_encode([
        "status" => "error",
        "message" => "Kein Spieler angemeldet!"
    ]);
    exit();
}

if (isset($_SESSION['Benutzername'])) {

    require_once('dbaccess.php');
    $db_obj = new mysqli($host, $user, $password, $database);
    if ($db_obj->connect_error) {
        echo json_encode(["status" => "error", "message" => "Connection Error"]);
        exit();
    }

    $json_data = file_get_contents("php://input");
    $data = json_decode($json_data, true);

    if (isset($data['score'])) {
        
        $Punktezahl = $data['score'];
        $Player = $_SESSION['Benutzername']; 
        $Datum = date("Y-m-d"); 
        $playerid = $_SESSION["playerid"];
        $sql = "INSERT INTO highscores (Punktezahl, Player, Datum, playerid) VALUES (?, ?, ?, ?)";
        
        if ($stmt = $db_obj->prepare($sql)) {
            $stmt->bind_param("issi", $Punktezahl, $Player, $Datum, $playerid);        
            if ($stmt->execute()) {
                echo json_encode(["status" => "success", "message" => "Score für $Player gespeichert!"]);
            } else {
                echo json_encode(["status" => "error", "message" => "Fehler beim Speichern"]);
            }
            $stmt->close();
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Kein Score erhalten"]);
    }

    $db_obj->close();

} else {
    echo json_encode(["status" => "error", "message" => "Speichern nicht möglich Sie müssen sich einloggen!"]);
}
?>