<?php
session_start();
include '../../../Config/phpDbConfig.php';

// CORS headers
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$data = json_decode(file_get_contents('php://input'), true);
$event_id = $data['event_id'] ?? null;

$response = [];

if ($event_id) {
    $sql = "UPDATE events SET eventStatus = 'approved' WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $event_id);

    if ($stmt->execute()) {
        $response = ["success" => true, "message" => "Event approved successfully"];
    } else {
        $response = ["success" => false, "message" => "Failed to approve event"];
    }

    $stmt->close();
} else {
    $response = ["success" => false, "message" => "Invalid event ID"];
}

echo json_encode($response);
$conn->close();
?>
