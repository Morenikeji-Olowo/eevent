<?php
include '../../../Config/phpDbConfig.php';
session_start();

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);
$postId = $data['post_Id'];
$userId = $_SESSION['userId'] ?? null;

if (!$userId) {
    echo json_encode(["success" => false, "message" => "Not logged in"]);
    exit();
}

$sql = "SELECT like_id FROM post_likes WHERE post_id = ? AND user_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $postId, $userId);
$stmt->execute();
$result = $stmt->get_result();

echo json_encode([
    "success" => true,
    "liked" => $result->num_rows > 0
]);
