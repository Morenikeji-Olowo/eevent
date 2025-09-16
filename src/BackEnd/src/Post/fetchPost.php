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
$sql = "
    SELECT 
        p.user_id,
        p.displayName, 
        p.username, 
        p.pfp, 
        d.caption,
        d.post_id,
        d.image_url
    FROM user_profiles p
    INNER JOIN posts d ON p.user_id = d.user_id
";

$result = $conn->query($sql);
$posts = [];
if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $posts[] = $row;
    }
}

echo json_encode(['success' => true, 'posts' => $posts]);
$conn->close();
?>
