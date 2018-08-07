<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Credentials: true");
    header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
    header('Access-Control-Max-Age: 1000');
    header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');
?>
<?php
//get credentials

$servername = "localhost";
$username = "admin";
$password = "admin";
$dbname = "customdb";

//$DBconfig=parse_ini_file('DBconfig.ini');
// Create connection
$conn = new mysqli($servername,$username,$password,$dbname);
// Check connection
if ($conn->connect_error) {
   die("Connection failed: " . $conn->connect_error);
}
$conn->set_charset("utf8");
$_POST = json_decode(file_get_contents("php://input"), true) ?: [];


$sql="INSERT into docappointment (name,mobile,date,starttime,endtime,reason) VALUES ('".$_POST["name"]."','".$_POST["mobile"]."','".$_POST["date"]."','".$_POST["starttime"]."','".$_POST["endtime"]."','".$_POST["reason"]."')";

// prepare and bind
$stmt = $conn->prepare($sql);



// set parameters and execute
if($stmt->execute() === TRUE){
	$x = 0;
} else {
    $x = 1;
}

$stmt->close();
$conn->close();

echo json_encode($x);

?>
