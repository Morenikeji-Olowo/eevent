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
$eventId = $data['eventId'] ?? null;

if (!$eventId) {
    echo json_encode(['success' => false, 'message' => 'No eventId provided']);
    exit();
}

$sql = "
    SELECT 
        e.id AS event_id,
        e.title,
        e.description,
        e.category,
        e.location_type,
        e.location_address,
        e.zoom_link,
        e.start_datetime,
        e.end_datetime,
        e.ticket_price,
        e.is_free,
        e.capacity,
        e.image_urls,
        e.status,
        e.created_at,
        e.updated_at,
        u.displayName,
        u.username,
        u.pfp,
        d.email
    FROM events e
    LEFT JOIN user_profiles u ON u.user_id = e.user_id
    LEFT JOIN users d ON d.id = e.user_id
    WHERE e.id = ?;
";

$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $eventId);
$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $event = $result->fetch_assoc();
    echo json_encode(['success' => true, 'event' => $event]);
} else {
    echo json_encode(['success' => false, 'message' => 'Event not found']);
}

$conn->close();
?>
