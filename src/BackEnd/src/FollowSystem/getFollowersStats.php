<?php 
include '../../../Config/phpDbConfig.php';
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
session_start();
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$userId = (int) ($_SESSION['userId'] ?? 0);
if ($userId === 0) {
    echo json_encode(['error' => 'User ID required']);
    exit;
}



// Follower count
$checkFollowers = $conn->prepare("SELECT COUNT(*) as followerCount FROM tbl_follow WHERE receiver_id = ?");
$checkFollowers->bind_param("i", $userId);
$checkFollowers->execute();
$followerResult = $checkFollowers->get_result()->fetch_assoc();
$checkFollowers->close();

// Following count
$checkFollowing = $conn->prepare("SELECT COUNT(*) as followingCount FROM tbl_follow WHERE sender_id = ?");
$checkFollowing->bind_param("i", $userId);
$checkFollowing->execute();
$followingResult = $checkFollowing->get_result()->fetch_assoc();
$checkFollowing->close();

// event count
$checkEvent = $conn->prepare("SELECT COUNT(*) as eventCount FROM events WHERE user_id = ?");
$checkEvent->bind_param("i", $userId);
$checkEvent->execute();
$eventResult = $checkEvent->get_result()->fetch_assoc();
$checkEvent->close();

echo json_encode([
    'success' => true,
    'followers' => $followerResult['followerCount'] ?? 0,
    'following' => $followingResult['followingCount'] ?? 0,
    'event' => $eventResult['eventCount'] ?? 0
]);
?>
