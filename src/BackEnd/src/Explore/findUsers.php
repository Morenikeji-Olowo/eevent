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
$userId = (int) ($_SESSION['userId'] ?? 0);

// Get query
$q = $_GET['q'] ?? '';
$q = $conn->real_escape_string($q);

if (empty($q)) {
    echo json_encode([]);
    exit;
}

// Search users and check if current user is following each one
$sql = "
    SELECT 
        u.id, 
        p.displayName, 
        p.username, 
        p.pfp,
        EXISTS (
    SELECT 1 FROM tbl_follow 
    WHERE sender_id = $userId AND receiver_id = u.id
) AS isFollowing
    FROM users u
    LEFT JOIN user_profiles p ON u.id = p.user_id
    WHERE (p.username LIKE '%$q%' OR p.displayName LIKE '%$q%') 
      AND u.id != $userId
    LIMIT 20
";

$result = $conn->query($sql);
$users = [];

while ($row = $result->fetch_assoc()) {
    // Convert isFollowing from int to boolean
$row['isFollowing'] = (int)$row['isFollowing'] === 1;
    $users[] = $row;
}

echo json_encode($users);
$conn->close();
?>
