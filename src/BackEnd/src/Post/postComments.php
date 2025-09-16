<?php
include '../../../Config/phpDbConfig.php';
session_start();

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

$userId = $_SESSION['userId'] ?? null;
$post_Id = $data['post_Id'];
$commentText = $data['commentText'] ?? null;

if (!$userId || !$post_Id || !$commentText) {
    echo json_encode(["success" => false, "message" => "Missing data"]);
    exit();
}

// Insert comment
$sql = "INSERT INTO post_comments (post_id, user_id, comment_text, created_at) 
        VALUES (?, ?, ?, NOW())";
$stmt = $conn->prepare($sql);
$stmt->bind_param("iis", $post_Id, $userId, $commentText);

if (!$stmt->execute()) {
    echo json_encode(["success" => false, "message" => "DB insert failed"]);
    exit();
}

$newId = $stmt->insert_id;
$stmt->close();

// Fetch the new comment with user details
$sql = "
SELECT c.comment_id, 
       c.comment_text, 
       c.created_at,
       u.user_id, 
       u.username, 
       u.displayName, 
       u.pfp
FROM post_comments c
JOIN user_profiles u ON u.user_id = c.user_id
WHERE c.comment_id = ?
";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $newId);
$stmt->execute();
$result = $stmt->get_result();
$newComment = $result->fetch_assoc();

echo json_encode([
    "success" => true,
    "comment" => $newComment // ✅ unified key name
]);
?>
