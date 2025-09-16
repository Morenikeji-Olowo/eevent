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

// Read JSON request
$data = json_decode(file_get_contents("php://input"), true);
$friendId = $data['friend_id'] ?? null;
$message = trim($data['message'] ?? '');

if (!$friendId || !$message) {
    echo json_encode(["success" => false, "error" => "Friend ID and message required"]);
    exit();
}

// ✅ Insert message
$sql = "INSERT INTO messages (sender_id, receiver_id, message, created_at) VALUES (?, ?, ?, NOW())";
$stmt = $conn->prepare($sql);
$stmt->bind_param("iis", $currentUser, $friendId, $message);

if ($stmt->execute()) {
    $newMessageId = $stmt->insert_id;

    // ✅ Fetch the new message so React can add it to state
    $fetchSql = "
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
        WHERE m.id = ?
    ";
    $fetchStmt = $conn->prepare($fetchSql);
    $fetchStmt->bind_param("i", $newMessageId);
    $fetchStmt->execute();
    $result = $fetchStmt->get_result();
    $newMessage = $result->fetch_assoc();

    echo json_encode(["success" => true, "newMessage" => $newMessage]);
} else {
    echo json_encode(["success" => false, "error" => "Failed to insert message"]);
}
?>
