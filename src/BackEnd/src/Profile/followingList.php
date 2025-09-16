<?php
session_start();
include '../../../Config/phpDbConfig.php';

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$data = json_decode(file_get_contents('php://input'), true);
$userId = $data['userId'];

$sql = "
SELECT 
       u.user_id, 
       u.username, 
       u.displayName, 
       u.pfp
FROM tbl_follow f
JOIN user_profiles u ON u.user_id = f.receiver_id
WHERE f.sender_id = ?
ORDER BY f.followed_at ASC
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();

$allFollowing = [];
while ($row = $result->fetch_assoc()) {
    $allFollowing[] = $row;
}

echo json_encode([
    "success" => true,
    "allFollowing" => $allFollowing
]);
?>
