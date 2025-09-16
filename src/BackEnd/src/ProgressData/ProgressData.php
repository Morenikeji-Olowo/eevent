<?php
session_start();
include '../../../Config/phpDbConfig.php';
header("Access-Control-Allow-Origin: http://localhost:5173"); // Your frontend origin
header("Access-Control-Allow-Credentials: true"); // Allow cookies/sessions
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if (!isset($_SESSION['userId'])) {
    http_response_code(401);
    echo json_encode(["error" => "You must be logged in to save progress."]);
    exit();
}

$user_id = $_SESSION['userId'];

$username = $_POST['username'] ?? null;
$displayName = $_POST['displayName'] ?? null;
$bio = $_POST['bio'] ?? null;

$pfpPath = null;
if (isset($_FILES['pfp']) && $_FILES['pfp']['error'] === UPLOAD_ERR_OK) {
    $uploadDir = '../../../uploads/pfp/';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }
    $fileName = uniqid() . "_" . basename($_FILES['pfp']['name']);
    $targetPath = $uploadDir . $fileName;

    if (move_uploaded_file($_FILES['pfp']['tmp_name'], $targetPath)) {
        $pfpPath = $fileName;
    }
}

$sql = "INSERT INTO user_profiles (user_id, username, displayName, bio, pfp)
        VALUES (?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE 
            username = VALUES(username),
            displayName = VALUES(displayName),
            bio = VALUES(bio),
            pfp = VALUES(pfp)";

$onBoardsql = "UPDATE users SET has_onboarded = TRUE WHERE id = ?";
$onboardstmt = $conn->prepare($onBoardsql);
$onboardstmt->bind_param("i", $user_id);
$onboardstmt->execute();
$onboardstmt->close();


$stmt = $conn->prepare($sql);
$stmt->bind_param("issss", $user_id, $username, $displayName, $bio, $pfpPath);

if ($stmt->execute()) {
    echo json_encode(["message" => "Progress saved successfully"]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Database error", "details" => $stmt->error]);
}

$stmt->close();
$conn->close();
