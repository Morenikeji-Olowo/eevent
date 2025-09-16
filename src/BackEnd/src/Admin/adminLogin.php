<?php
session_start();
include '../../../Config/phpDbConfig.php';

// CORS headers
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}


$data = json_decode(file_get_contents("php://input"), true);

$email = trim($data['email'] ?? '');
$token = $data['token'] ?? '';

$errors = [];

// Validate inputs
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = "Invalid email format.";
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "errors" => $errors
    ]);
    exit();
}

// Check if email exists
$stmt = $conn->prepare("SELECT * FROM admin WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "errors" => ["email" => "Email not registered."]
    ]);
    exit();
}

$user = $result->fetch_assoc();

// Verify password
if (!password_verify($token, $user['token'])) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "errors" => ["token" => "Incorrect token."]
    ]);
    exit();
}

// Store user session
$_SESSION['adminId'] = $user['id'];

http_response_code(200);
echo json_encode([
    "success" => true,
    "message" => "Login successful",
    "user" => [
        "id" => $user['id'],
        "name" => $user['name'],
        "email" => $user['email']
    ],
]);

$stmt->close();
$conn->close();
?>
