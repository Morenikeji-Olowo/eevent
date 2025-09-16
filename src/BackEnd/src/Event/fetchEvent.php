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

    -- Creator details
    u.displayName,
    u.username,
    u.pfp,
    d.email
FROM events e
LEFT JOIN user_profiles u ON u.user_id = e.user_id
LEFT JOIN users d ON d.id = e.user_id WHERE e.eventStatus = 'approved';"
;

$result = $conn->query($sql);
$events = [];
if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $events[] = $row;
    }
}

echo json_encode(['success' => true, 'events' => $events]);
$conn->close();
?>
