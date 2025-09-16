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

$userId = $_SESSION['userId'] ?? null;

if (!$userId) {
    echo json_encode(['success' => false, 'message' => 'User not logged in']);
    exit();
}

$userSql = "
    SELECT user_id, username, displayName, bio, pfp
    FROM user_profiles
    WHERE user_id = ?
";
$userStmt = $conn->prepare($userSql);
$userStmt->bind_param("i", $userId);
$userStmt->execute();
$userResult = $userStmt->get_result();

if ($userResult->num_rows === 0) {
    echo json_encode(['success' => false, 'message' => 'User not found']);
    exit();
}

$user = $userResult->fetch_assoc();

$followersCountStmt = $conn->prepare("SELECT COUNT(*) as total FROM tbl_follow WHERE receiver_id = ?");
$followersCountStmt->bind_param("i", $userId);
$followersCountStmt->execute();
$followersCount = $followersCountStmt->get_result()->fetch_assoc()['total'];

$followingCountStmt = $conn->prepare("SELECT COUNT(*) as total FROM tbl_follow WHERE sender_id = ?");
$followingCountStmt->bind_param("i", $userId);
$followingCountStmt->execute();
$followingCount = $followingCountStmt->get_result()->fetch_assoc()['total'];

$postsCountStmt = $conn->prepare("SELECT COUNT(*) as total FROM posts WHERE user_id = ?");
$postsCountStmt->bind_param("i", $userId);
$postsCountStmt->execute();
$postsCount = $postsCountStmt->get_result()->fetch_assoc()['total'];

$eventsCountStmt = $conn->prepare("SELECT COUNT(*) as total FROM events WHERE user_id = ?");
$eventsCountStmt->bind_param("i", $userId);
$eventsCountStmt->execute();
$eventsCount = $eventsCountStmt->get_result()->fetch_assoc()['total'];

$postsStmt = $conn->prepare("SELECT * FROM posts WHERE user_id = ? ORDER BY created_at DESC");
$postsStmt->bind_param("i", $userId);
$postsStmt->execute();
$posts = $postsStmt->get_result()->fetch_all(MYSQLI_ASSOC);

$eventsStmt = $conn->prepare("SELECT * FROM events WHERE user_id = ? ORDER BY start_datetime DESC");
$eventsStmt->bind_param("i", $userId);
$eventsStmt->execute();
$events = $eventsStmt->get_result()->fetch_all(MYSQLI_ASSOC);

echo json_encode([
    "success" => true,
    "user" => $user,
    "followersCount" => $followersCount,
    "followingCount" => $followingCount,
    "postsCount" => $postsCount,
    "eventsCount" => $eventsCount,
    "posts" => $posts,
    "events" => $events
]);

$conn->close();
?>
