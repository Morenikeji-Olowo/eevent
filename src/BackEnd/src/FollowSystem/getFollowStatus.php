<?php
include '../../../Config/phpDbConfig.php';
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit();

session_start();
$userId = (int) ($_SESSION['userId'] ?? 0);
$data = json_decode(file_get_contents("php://input"), true);
$profileUserId = (int) ($data['profileUserId'] ?? 0);

if (!$userId || !$profileUserId) {
    echo json_encode(["success" => false, "isFollowing" => false]);
    exit();
}

$stmt = $conn->prepare("SELECT 1 FROM tbl_follow WHERE sender_id=? AND receiver_id=?");
$stmt->bind_param("ii", $userId, $profileUserId);
$stmt->execute();
$result = $stmt->get_result();
$isFollowing = $result->num_rows > 0;
$stmt->close();

echo json_encode(["success" => true, "isFollowing" => $isFollowing]);
$conn->close();
