<?php
include '../../../Config/phpDbConfig.php';
session_start();

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$data = json_decode(file_get_contents("php://input"), true);
$postId = $data['post_Id'];

$sql = "
SELECT c.like_id, 
       c.created_at,
       u.user_id, 
       u.username, 
       u.displayName, 
       u.pfp
FROM post_likes c
JOIN user_profiles u ON u.user_id = c.user_id
WHERE c.post_id = ?
ORDER BY c.created_at ASC
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $postId);
$stmt->execute();
$result = $stmt->get_result();

$allLikes = [];
while ($row = $result->fetch_assoc()) {
    $allLikes[] = $row;
}

echo json_encode([
    "success" => true,
    "allLikes" => $allLikes
]);
?>
