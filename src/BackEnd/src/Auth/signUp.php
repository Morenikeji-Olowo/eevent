<?php
include '../../../Config/phpDbConfig.php';

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Get JSON body
$data = json_decode(file_get_contents("php://input"), true);

// Collect variables
$firstName = trim($data['firstName'] ?? '');
$lastName = trim($data['lastName'] ?? '');
$email = trim($data['email'] ?? '');
$password = $data['password'] ?? '';
$confirmPassword = $data['confirmPassword'] ?? '';

$errors = [];

// Validate inputs
if (empty($firstName)) $errors['firstName'] = "First name is required.";
if (empty($lastName)) $errors['lastName'] = "Last name is required.";
if (empty($email)) $errors['email'] = "Email is required.";
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors['email'] = "Invalid email format.";
if (empty($password)) $errors['password'] = "Password is required.";
if (strlen($password) < 6) $errors['password'] = "Password must be at least 6 characters long.";
if ($password !== $confirmPassword) $errors['confirmPassword'] = "Passwords do not match.";

// If there are errors, send them and exit
if (!empty($errors)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "errors" => $errors
    ]);
    exit();
}

// Combine first + last name
$name = ucwords(strtolower($firstName . " " . $lastName));
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Check for duplicate email
$checkstmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
$checkstmt->bind_param("s", $email);
$checkstmt->execute();
$checkstmt->store_result();

if ($checkstmt->num_rows > 0) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "errors" => ["duplicate" => "User with this email already exists."]
    ]);
    exit();
}

// Insert new user
$stmt = $conn->prepare("INSERT INTO users (name, password, email) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $name, $hashedPassword, $email);

if ($stmt->execute()) {
    http_response_code(201);
    echo json_encode([
        "success" => true,
        "message" => "User registered successfully"
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Database insert failed: " . $stmt->error
    ]);
}

$stmt->close();
$conn->close();
?>
