<?php
include '../../../Config/phpDbConfig.php';

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

session_start();

if (!isset($_SESSION['userId'])) {
    echo json_encode(["success" => false, "error" => "User not logged in"]);
    exit();
}

$currentUser = $_SESSION['userId'];

if (!isset($_GET['friend_id'])) {
    echo json_encode(["success" => false, "error" => "Friend ID missing"]);
    exit();
}

$friendId = intval($_GET['friend_id']);

$sql = "
SELECT 
  m.id,
  m.sender_id,
  m.receiver_id,
  m.message,
  m.created_at,
  sender.username AS sender_name,
  sender.displayName AS sender_display,
  sender.pfp AS sender_pfp,
  receiver.username AS receiver_name,
  receiver.displayName AS receiver_display,
  receiver.pfp AS receiver_pfp
FROM messages m
JOIN user_profiles sender ON sender.user_id = m.sender_id
JOIN user_profiles receiver ON receiver.user_id = m.receiver_id
WHERE 
  (m.sender_id = ? AND m.receiver_id = ?)
  OR
  (m.sender_id = ? AND m.receiver_id = ?)
ORDER BY m.created_at ASC
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("iiii", $currentUser, $friendId, $friendId, $currentUser);
$stmt->execute();
$result = $stmt->get_result();

$messages = [];
while ($row = $result->fetch_assoc()) {
    $messages[] = $row;
}

echo json_encode(["success" => true, "messages" => $messages]);
?>
