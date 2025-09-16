<?php
include '../../../Config/phpDbConfig.php';

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

session_start();

$data = json_decode(file_get_contents('php://input'), true);
$name = $data['name'] ?? null;
$token = $data['token'] ?? null;
$email = $data['email'] ?? null;

if (!$name || !$token || !$email) {
    echo json_encode([
        'success' => false,
        'message' => 'All fields are required'
    ]);
    exit();
}

$hashedToken = password_hash($token, PASSWORD_DEFAULT);

$sql = 'INSERT INTO admin (name, token, email) VALUES (?, ?, ?)';
$stmt = $conn->prepare($sql);
$stmt->bind_param('sss', $name, $hashedToken, $email);

if ($stmt->execute()) {
    echo json_encode([
        'success' => true,
        'message' => 'Admin added successfully'
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Failed to add admin'
    ]);
}
?>
