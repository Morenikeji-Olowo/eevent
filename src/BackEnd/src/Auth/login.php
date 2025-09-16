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
$password = $data['password'] ?? '';

$errors = [];

// Validate inputs
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = "Invalid email format.";
}

if (strlen($password) < 6) {
    $errors['password'] = "Password must be at least 6 characters long.";
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
$stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
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
if (!password_verify($password, $user['password'])) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "errors" => ["password" => "Incorrect password."]
    ]);
    exit();
}

// Store user session
$_SESSION['userId'] = $user['id'];
$_SESSION['user'] = [
    "name" => $user['name'],
    "email" => $user['email']
];

$userId = $_SESSION['userId'];
$stmt = $conn->prepare("SELECT has_onboarded FROM users WHERE id = ?");
$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();

$hasOnboarded = (bool)$row['has_onboarded']; // cast to bool for clean JSON

http_response_code(200);
echo json_encode([
    "success" => true,
    "message" => "Login successful",
    "user" => [
        "id" => $user['id'],
        "name" => $user['name'],
        "email" => $user['email']
    ],
    "hasOnBoarded"=>$hasOnboarded
]);

$stmt->close();
$conn->close();
?>
