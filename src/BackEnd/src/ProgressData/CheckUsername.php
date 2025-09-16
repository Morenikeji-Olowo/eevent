<?php
session_start();
include '../../../Config/phpDbConfig.php';

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);
$username = trim($data['username'] ?? '');

if ($username === '') {
    echo json_encode(['success' => false, 'message' => 'Username is required']);
    exit;
}

$stmt = $conn->prepare("SELECT id FROM user_profiles WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode(['success' => false, 'message' => 'Username already taken']);
} else {
    echo json_encode(['success' => true, 'message' => 'Username is available']);
}
