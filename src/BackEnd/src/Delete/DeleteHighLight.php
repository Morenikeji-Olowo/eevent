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

$data = json_decode(file_get_contents("php://input"), true);
$highLightId = $data['highLightId'] ?? null;

if (!$highLightId) {
    echo json_encode(['success' => false, 'message' => 'No  ID provided']);
    exit();
}

$sql = "DELETE FROM highlights WHERE id=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $highLightId);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'HighLight deleted']);
} else {
    echo json_encode(['success' => false, 'message' => 'Could not delete highlight']);
}

$conn->close();
?>
