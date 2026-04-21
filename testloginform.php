<?php
 $loginMsg = $Vorname = $VornameErr = $PasswortErr = "";
if ($_SERVER["REQUEST_METHOD"] == "POST")
  {   
    if (empty($_POST["Vorname"])) 
      {
        $VornameErr = "Dies ist ein Pflichtfeld";
      } 

    if (empty($_POST["Passwort"])) 
      {
        $PasswortErr = "Dies ist ein Pflichtfeld";
      } 
    require_once('dbaccess.php');

    if(isset($_POST["Vorname"]) && !empty($_POST["Vorname"]) && isset ($_POST["Passwort"]) && !empty($_POST["Passwort"]))
    {
        $Vorname = $_POST["Vorname"];

    $db_obj = new mysqli($host, $user, $password, $database);
    if ($db_obj->connect_error) {
    echo "Connection Error: " . $db_obj->connect_error;
    exit();
    }
    $sql = "SELECT Passwort FROM player WHERE Vorname = ?";
    $stmt = $db_obj->prepare($sql);
    $stmt->bind_param("s", $Vorname);
    $stmt->execute();
    
    $stmt->bind_result($Passwort);

    if ($stmt->fetch()) {
        if(password_verify($_POST["Passwort"], $Passwort)) {
        $loginMsg = "Valid password!<br>";
        } else {
            $loginMsg =  "Invalid password!<br>";
        }
           
    } else {
            $loginMsg = "User nicht gefunden!";
        }
    
}
      
    $stmt->close();
    $db_obj->close();
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
    <h1>Login</h1>
    <form method="post" action=""> 

        <div class="form-floating mb-3">              
            <input type="text" class="form-control" name="Vorname" id="name" value="<?php echo $Vorname;?>">
            <label for="name">Vorname</label>
            <span class="error">* <?php echo $VornameErr;?></span>
        </div>
        <div class="form-floating mb-3">  
            
            <input type="password" class="form-control" name="Passwort" id="password" value="">
            <label for="password">Passwort</label>
            <span class="error">* <?php echo $PasswortErr;?></span>
        </div>              
        <button type="submit">Login</button>
        <p><?php echo $loginMsg; ?></p>
        </form>
        </div>
      </div>
    </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</body>
</html>