<?php
include '../cors.php';
session_start();
session_unset();   // remove all session variables
session_destroy(); // destroy the session

echo json_encode(["success" => true, "message" => "Logged out successfully"]);
exit();
?>
