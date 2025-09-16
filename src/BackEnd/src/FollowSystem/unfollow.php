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
    echo json_encode(['success' => false, 'message' => 'Cannot unfollow yourself']);
    exit();
}

$stmt = $conn->prepare("DELETE FROM tbl_follow WHERE sender_id=? AND receiver_id=?");
$stmt->bind_param("ii", $currentUserId, $receiverId);
$stmt->execute();

if ($stmt->affected_rows > 0) {
    echo json_encode(['success' => true, 'following' => false, 'message' => 'Unfollowed']);
} else {
    echo json_encode(['success' => true, 'following' => false, 'message' => 'Not following']);
}

$stmt->close();
$conn->close();
?>
