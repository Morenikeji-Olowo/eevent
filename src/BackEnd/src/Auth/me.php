<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

if (!isset($_SESSION['user'])) {
  echo json_encode([
    'authenticated' => false
  ]);
  exit;
}

echo json_encode([
  'authenticated' => true,
  'user' => $_SESSION['userId'] // This could be an array with user_id, username, pfp, etc.
]);
