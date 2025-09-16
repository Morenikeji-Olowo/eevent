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
if(!$userId){
    json_encode([
        'success' => false,
        'message' => 'user Not logged in'
    ]);
    exit();
}

$sql = "SELECT * FROM highlights WHERE user_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $userId);

if ($stmt->execute()) {
    $result = $stmt->get_result();

    $highLights = [];
    while ($row = $result->fetch_assoc()) {
        $highLights[] = $row;
    }

    echo json_encode([
        'success' => true,
        'highLights' => $highLights
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Failed to fetch highlights: ' . $stmt->error
    ]);
}
$conn->close();
?>
