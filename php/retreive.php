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


$sql="  SELECT ID, name,mobile,starttime,endtime,reason,date   FROM docappointment";

// prepare and bind
$stmt = $conn->prepare($sql);

// set parameters and execute
$stmt->execute();
$stmt->store_result();
$stmt->bind_result($id,$name,$mobile,$starttime,$endtime,$reason,$date);

$res=[];
$myObj = new stdClass();

while($stmt->fetch())
{
    $res[]=array("ID"=>$id,
				"username"=>$name,
               "mobile"=>$mobile,
               "starttime"=>$starttime,
			   "endtime"=>$endtime,
			"reason" => $reason,
			"date" => $date
               );
}
$myObj->data = $res;

$stmt->close();
$conn->close();

echo json_encode($myObj);

?>
