<?php
$VornameErr = $NachnameErr = $EmailErr = $PasswortErr = "";
$Vorname = $Nachname = $Email = $Passwort = "";
if ($_SERVER["REQUEST_METHOD"] == "POST")
  {
      if (empty($_POST["Vorname"])) 
      {
        $VornameErr = "Dies ist ein Pflichtfeld";
      } 
      else 
      {
        $Vorname = inputvalidation($_POST["Vorname"]);
        if (!preg_match("/^[a-zA-Z-' ]*$/",$Vorname)) 
        {
            $VornameErr = "Nur Buchstaben und Abstände erlaubt";
        }
      }
        
      if (empty($_POST["Nachname"])) 
      {
        $NachnameErr = "Dies ist ein Pflichtfeld";
      } 
      else 
      {
        $Nachname = inputvalidation($_POST["Nachname"]);
        if (!preg_match("/^[a-zA-Z-' ]*$/",$Nachname)) 
        {
            $NachnameErr = "Nur Buchstaben und Abstände erlaubt";
        }
      }
    
      if (empty($_POST["Email"])) 
      {
        $EmailErr = "Dies ist ein Pflichtfeld";
      } 
      else 
      {
        $Email = inputvalidation($_POST["Email"]);  
        if (!filter_var($Email, FILTER_VALIDATE_EMAIL))
        {
            $EmailErr = "Falsches Emailformat";
        }        
      }
      if (empty($_POST["Passwort"])) {
        $PasswortErr = "Dies ist ein Pflichtfeld";
      } elseif (!preg_match('/[0-9]/', $_POST["Passwort"])) {
        $PasswortErr = "Mindestens eine Zahl erforderlich!";
      } else {
        $Passwort = $_POST["Passwort"];
      }
    
  }
    function inputvalidation($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }
  

require_once('dbaccess.php');

if(isset($_POST["Vorname"]) && !empty($_POST["Vorname"]) && isset($_POST["Nachname"]) && !empty($_POST["Nachname"])
&& isset($_POST["Email"]) && !empty($_POST["Email"]) && isset ($_POST["Passwort"]) && !empty($_POST["Passwort"]) 
&& empty($PasswortErr) && empty($VornameErr) && empty($NachnameErr) && empty($EmailErr))
{


$db_obj = new mysqli($host, $user, $password, $database);
if ($db_obj->connect_error) {
echo "Connection Error: " . $db_obj->connect_error;
exit();
}
$Passwort = password_hash($Passwort, PASSWORD_DEFAULT);

$sql = "INSERT INTO `player` (`Vorname`, `Nachname`, `Email`, `Passwort`, `Rolle`)
VALUES (?, ?, ?, ?, 'guest')";
$stmt = $db_obj->prepare($sql);
$stmt-> bind_param("ssss", $Vorname, $Nachname, $Email, $Passwort);

if ($stmt->execute()) { echo "Account wurde erfolgreich angelegt"; } else { echo "Registrierung fehlgeschlagen"; }
$stmt->close(); $db_obj->close();
}
?>
<!DOCTYPE html>

<html>
<head>
<meta charset="UTF-8">
<title>Registrierung</title>

<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
</head>
<body>



<div class="container">
  <div class="row">
    <div class="col">
    <h1>Registrierung</h1>
    <form method="post" action=""> 

        <div class="form-floating mb-3">              
            <input type="text" class="form-control" name="Vorname" id="name" value="<?php echo $Vorname;?>">
            <label for="name">Vorname</label>
            <span class="error">* <?php echo $VornameErr;?></span>
        </div>
        <div class="form-floating mb-3">            
            <input type="text" class="form-control" name="Nachname" id="surname" value="<?php echo $Nachname;?>">
            <label for="surname">Nachname</label>
            <span class="error">* <?php echo $NachnameErr;?></span>
        </div>
        <div class="form-floating mb-3">  
            
            <input type="text" class="form-control" name="Email" id="email" value="<?php echo $Email;?>">
            <label for="email">Email</label>
            <span class="error">* <?php echo $EmailErr;?></span>
        </div>         
        <div class="form-floating mb-3">  
            
            <input type="password" class="form-control" name="Passwort" id="password" value="">
            <label for="password">Passwort</label>
            <span class="error">* <?php echo $PasswortErr;?></span>
        </div>              
        <button type="submit">registrieren</button>
        </form>
        </div>
      </div>
    </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</body>
</html>