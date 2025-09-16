<?php
include '../../../Config/phpDbConfig.php';

// CORS headers
header("Access-Control-Allow-Origin: http://localhost:5173"); // React frontend
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

session_start();

// Your existing logic
$userId = (int) ($_SESSION['userId'] ?? 0);
$data = json_decode(file_get_contents("php://input"), true);
$receiverId = (int) ($data['receiverId'] ?? 0);

if (!$userId || !$receiverId) {
    echo json_encode(["success" => false, "message" => "Missing user IDs"]);
    exit();
}

// Prevent following self
if ($userId === $receiverId) {
    echo json_encode(['success' => false, 'message' => 'Cannot follow yourself']);
    exit();
}

// Check follow state
$checkstmt = $conn->prepare("SELECT 1 FROM tbl_follow WHERE sender_id=? AND receiver_id=?");
$checkstmt->bind_param("ii", $userId, $receiverId);
$checkstmt->execute();
$result = $checkstmt->get_result();

if ($result->num_rows > 0) {
    // Already following → unfollow
    $stmt = $conn->prepare("DELETE FROM tbl_follow WHERE sender_id=? AND receiver_id=?");
    $stmt->bind_param("ii", $userId, $receiverId);
    $stmt->execute();
    $stmt->close();

    $isFollowing = false;
} else {
    // Not following → follow
    $stmt = $conn->prepare("INSERT INTO tbl_follow (sender_id, receiver_id) VALUES (?, ?)");
    $stmt->bind_param("ii", $userId, $receiverId);
    $stmt->execute();
    $stmt->close();

    $isFollowing = true;
}

echo json_encode(['success' => true, 'isFollowing' => $isFollowing]);
$checkstmt->close();
?>
