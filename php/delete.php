<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Credentials: true");
    header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
    header('Access-Control-Max-Age: 1000');
    header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
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


$sql="DELETE FROM docappointment WHERE ID = ?";

// prepare and bind
$stmt = $conn->prepare($sql);
$npa_id= intval(mysqli_real_escape_string($conn,$_GET['id']));

if (!$stmt->bind_param("i",$npa_id))
{
echo "Parameters binding error: (" . $stmt->errno . ") " . $stmt->error;
}

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
