<?php
session_start();

// Allow frontend to read session info
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

if (isset($_SESSION['adminId'])) {
    echo json_encode([
        "loggedIn" => true,
        "user" => $_SESSION['adminId']
    ]);
} else {
    echo json_encode(["loggedIn" => false]);
}
?>
