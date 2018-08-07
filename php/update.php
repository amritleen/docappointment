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
$_POST = json_decode(file_get_contents("php://input"), true) ?: [];

$sql="UPDATE docappointment SET name= '".$_POST["name"]."', mobile= '".$_POST["mobile"]."',date='".$_POST["date"]."',starttime= '".$_POST["starttime"]."',endtime= '".$_POST["endtime"]."',reason='".$_POST["reason"]."' WHERE ID = '".$_POST["id"]."' ";
//$sql="UPDATE docappointment SET name= 'xyz' WHERE ID = 21";



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
