<?php 
include '../../../Config/phpDbConfig.php';

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

session_start();

$currentUser = $_SESSION['userId'] ?? null;
if (!$currentUser) {
    echo json_encode(["success" => false, "message" => "Not logged in"]);
    exit();
}

// ✅ Select mutual followers (friends)
$sql = "
SELECT DISTINCT u.user_id, u.username, u.displayName, u.pfp
FROM tbl_follow f1
JOIN tbl_follow f2 
  ON f1.sender_id = f2.receiver_id 
 AND f1.receiver_id = f2.sender_id
JOIN user_profiles u 
  ON u.user_id = IF(f1.sender_id = ?, f1.receiver_id, f1.sender_id)
WHERE ? IN (f1.sender_id, f1.receiver_id)
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $currentUser, $currentUser);
$stmt->execute();
$result = $stmt->get_result();

$friends = [];
while ($row = $result->fetch_assoc()) {
    // Avoid returning yourself
    if ($row['user_id'] != $currentUser) {
        $friends[] = $row;
    }
}

echo json_encode([
    "success" => true,
    "friends" => $friends
]);

$conn->close();
?>
