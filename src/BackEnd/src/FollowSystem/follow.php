<?php 
include '../../../Config/phpDbConfig.php';

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

session_start();

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$currentUserId = (int) ($_SESSION['userId'] ?? 0);
$receiverId = (int) ($_POST['receiver_id'] ?? 0);

if ($currentUserId === 0 || $receiverId === 0) {
    echo json_encode(['success' => false, 'message' => 'Invalid request']);
    exit();
}

if ($currentUserId === $receiverId) {
    echo json_encode(['success' => false, 'message' => 'Cannot follow yourself']);
    exit();
}

// Check if already following
$check = $conn->prepare("SELECT 1 FROM tbl_follow WHERE sender_id=? AND receiver_id=?");
$check->bind_param("ii", $currentUserId, $receiverId);
$check->execute();
$res = $check->get_result();

if ($res->num_rows > 0) {
    echo json_encode(['success' => true, 'following' => true, 'message' => 'Already following']);
} else {
    $stmt = $conn->prepare("INSERT INTO tbl_follow (sender_id, receiver_id) VALUES (?, ?)");
    $stmt->bind_param("ii", $currentUserId, $receiverId);
    $stmt->execute();
    $stmt->close();

    echo json_encode(['success' => true, 'following' => true, 'message' => 'Now following']);
}

$check->close();
$conn->close();
?>
