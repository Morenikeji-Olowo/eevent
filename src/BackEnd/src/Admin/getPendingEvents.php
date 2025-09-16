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

// Ensure only admins can access
if (!isset($_SESSION['adminId'])) {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Unauthorized"]);
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
        e.eventStatus,
        e.created_at,
        e.updated_at,
        e.user_id,

        -- Organizer details
        u.displayName,
        u.username,
        u.pfp,
        d.email
    FROM events e
    LEFT JOIN user_profiles u ON u.user_id = e.user_id
    LEFT JOIN users d ON d.id = e.user_id
    WHERE e.eventStatus = 'pending'
    ORDER BY e.created_at DESC
";

$result = $conn->query($sql);

$events = [];
if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $events[] = $row;
    }
}

echo json_encode(["success" => true, "events" => $events]);

$conn->close();
