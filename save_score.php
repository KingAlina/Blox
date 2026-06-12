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
        echo json_encode([
            "status" => "error",
            "message" => "Connection Error"
        ]);
        exit();
    }

    $json_data = file_get_contents("php://input");
    $data = json_decode($json_data, true);

    if (isset($data['score'])) {

        $Punktezahl = (int)$data['score'];
        $Player = $_SESSION['Benutzername'];
        $Datum = date("Y-m-d");
        $playerid = $_SESSION["playerid"];

        
        $sql = "SELECT Punktezahl FROM highscores WHERE playerid = ?";
        $stmt = $db_obj->prepare($sql);
        $stmt->bind_param("i", $playerid);
        $stmt->execute();

        $result = $stmt->get_result();

        if ($result->num_rows > 0) {

            $row = $result->fetch_assoc();

            if ($Punktezahl > $row['Punktezahl']) {

                $sql = "UPDATE highscores
                        SET Punktezahl = ?, Datum = ?
                        WHERE playerid = ?";

                $update = $db_obj->prepare($sql);
                $update->bind_param("isi", $Punktezahl, $Datum, $playerid);

                if ($update->execute()) {
                    echo json_encode([
                        "status" => "success",
                        "message" => "Neuer Highscore gespeichert!"
                    ]);
                } else {
                    echo json_encode([
                        "status" => "error",
                        "message" => "Fehler beim Aktualisieren"
                    ]);
                }

                $update->close();

            } else {

                echo json_encode([
                    "status" => "info",
                    "message" => "Kein neuer Highscore."
                ]);
            }

        } else {

            $sql = "INSERT INTO highscores
                    (Punktezahl, Player, Datum, playerid)
                    VALUES (?, ?, ?, ?)";

            $insert = $db_obj->prepare($sql);
            $insert->bind_param("issi", $Punktezahl, $Player, $Datum, $playerid);

            if ($insert->execute()) {
                echo json_encode([
                    "status" => "success",
                    "message" => "Erster Highscore gespeichert!"
                ]);
            } else {
                echo json_encode([
                    "status" => "error",
                    "message" => "Fehler beim Speichern"
                ]);
            }

            $insert->close();
        }

        $stmt->close();

    } else {

        echo json_encode([
            "status" => "error",
            "message" => "Kein Score erhalten"
        ]);
    }

    $db_obj->close();

} else {

    echo json_encode([
        "status" => "error",
        "message" => "Speichern nicht möglich. Sie müssen sich einloggen!"
    ]);
}
?>