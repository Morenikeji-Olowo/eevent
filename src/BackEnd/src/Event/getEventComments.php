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

$data = json_decode(file_get_contents('php://input'), true);
$event_Id = $data['event_Id'] ?? null;

if (!$event_Id) {
    echo json_encode(["success" => false, "message" => "Missing event ID"]);
    exit();
}

$sql = "SELECT c.comment_id, c.comment_text, c.created_at, c.parent_id, 
               u.username, u.pfp 
        FROM event_comments c
        JOIN user_profiles u ON c.user_id = u.user_id
        WHERE c.event_id = ?
        ORDER BY c.created_at ASC";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $event_Id);
$stmt->execute();
$result = $stmt->get_result();

$comments = [];
while ($row = $result->fetch_assoc()) {
    $comments[] = $row;
}

echo json_encode([
    "success" => true,
    "comments" => $comments
]);
