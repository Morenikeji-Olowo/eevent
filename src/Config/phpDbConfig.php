<?php  
// database credentials
$username = 'root';
$password = '';
$db = 'eevent';
$host = 'localhost';


// connect to mysql
$conn = new mysqli($host,$username,$password,$db);


// check connection
if($conn->connect_error){
    die("Connection Failed " . $conn->connect_error);
}



//headers

//tells the client to expect json
header('Content-Type: application/json'); 
//tells the client to allow cross-origin requests
header('Access-Control-Allow-Origin: *');
//tells the client to accept the following methods
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');



?>
