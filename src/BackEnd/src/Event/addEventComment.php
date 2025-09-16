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
$data = json_decode(file_get_contents('php://input'), true);

$commentItem = $data['commentItem'] ?? '';
$userId      = $_SESSION['userId'] ?? null;
$event_Id    = $data['event_Id'] ?? null;

if (!$userId || !$event_Id || !$commentItem) {
    echo json_encode(["success" => false, "message" => "Invalid input"]);
    exit();
}

$parentId = $data['parent_id'] ?? null;

$sql = "INSERT INTO event_comments (event_id, user_id, parent_id, comment_text) 
        VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("iiis", $event_Id, $userId, $parentId, $commentItem);

if ($stmt->execute()) {
    $newId = $stmt->insert_id;

    // Fetch full comment with user info
    $query = "SELECT c.comment_id, c.comment_text, c.created_at, u.username, u.pfp
              FROM event_comments c
              JOIN user_profiles u ON c.user_id = u.user_id
              WHERE c.comment_id = ?";
    $stmt2 = $conn->prepare($query);
    $stmt2->bind_param("i", $newId);
    $stmt2->execute();
    $result = $stmt2->get_result();
    $newComment = $result->fetch_assoc();

    echo json_encode([
        "success" => true,
        "comment" => $newComment
    ]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to add comment"]);
}
