<?php
include "includes/header.php";

 $loginMsg = $Benutzername = $BenutzernameErr = $PasswortErr = $id = "";
if ($_SERVER["REQUEST_METHOD"] == "POST")
  {   
    if (empty($_POST["Benutzername"])) 
      {
        $BenutzernameErr = "Dies ist ein Pflichtfeld";
      } 
    if (empty($_POST["Passwort"])) 
      {
        $PasswortErr = "Dies ist ein Pflichtfeld";
      } 
    require_once('dbaccess.php');

    if(isset($_POST["Benutzername"]) && !empty($_POST["Benutzername"]) && isset ($_POST["Passwort"]) && !empty($_POST["Passwort"]))
    {
        $Benutzername = $_POST["Benutzername"];

    $db_obj = new mysqli($host, $user, $password, $database);
    if ($db_obj->connect_error) {
    echo "Connection Error: " . $db_obj->connect_error;
    exit();
    }
    $sql = "SELECT id, Passwort FROM player WHERE Benutzername = ?";
    $stmt = $db_obj->prepare($sql);
    $stmt->bind_param("s", $Benutzername);
    $stmt->execute();
    
    $stmt->bind_result($id, $Passwort);

    if ($stmt->fetch()) {
        if(password_verify($_POST["Passwort"], $Passwort)) {
        $loginMsg = "Valid password!<br>";
        $_SESSION["Benutzername"] = $Benutzername;
        $_SESSION["playerid"] = $id;
        header("Location: game.php");
        } else {
            $loginMsg =  "Invalid password!<br>";
        }
           
    } else {
            $loginMsg = "User nicht gefunden!";
        }
    $stmt->close();
    $db_obj->close();
    
    }    
  }  
?>


<!DOCTYPE html>

<html>
<head>
<meta charset="UTF-8">
<title>Login</title>

<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
</head>
<body>



<div class="container">
  <div class="row">
    <div class="col">
    <h1 class="title">Login</h1>
    <form method="post" action=""> 

        <div class="form-floating mb-3">              
            <input type="text" class="form-control" name="Benutzername" id="name" value="<?php echo $Benutzername;?>">
            <label for="Benutzername">Benutzername</label>
            <span class="error">* <?php echo $BenutzernameErr;?></span>
        </div>
        <div class="form-floating mb-3">  
            
            <input type="password" class="form-control" name="Passwort" id="password" value="">
            <label for="password">Passwort</label>
            <span class="error">* <?php echo $PasswortErr;?></span>
        </div>              
        <button type="submit">Login</button>
        <p class="error"><?php echo $loginMsg; ?></p>
        </form>
        </div>
      </div>
    </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</body>
</html>