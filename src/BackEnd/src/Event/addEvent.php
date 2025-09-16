<?php
include '../../../Config/phpDbConfig.php';
session_start();
include '../cors.php';

header("Content-Type: application/json");

$userId = $_SESSION['userId'] ?? null;
if (!$userId) {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Unauthorized"]);
    exit;
}

// Read form data (from multipart/form-data)
$title = $_POST['eventTitle'] ?? '';
$description = $_POST['eventDescription'] ?? '';
$category = $_POST['category'] ?? '';
$locationType = $_POST['locationType'] ?? 'venue';
$locationAddress = $_POST['searchedLocation'] ?? null;
$zoomLink = $_POST['zoomId'] ?? null;
$startDateTime = $_POST['eventDate'] . " " . $_POST['startTime'];
$endDateTime = $_POST['eventDate'] . " " . $_POST['endTime'];
$ticketPrice = $_POST['price'] ?? 0;
$isFree = isset($_POST['freeEvent']) && $_POST['freeEvent'] === 'true' ? 1 : 0;
$capacity = $_POST['capacity'] ?? null;
$status = $_POST['status'] ?? 'draft';

$imageUrls = [];
if (!empty($_FILES['images']['name'][0])) {
    $targetDir = "../../../uploads/";
    foreach ($_FILES['images']['tmp_name'] as $key => $tmpName) {
        $imageName = time() . "_" . basename($_FILES['images']['name'][$key]);
        $targetFile = $targetDir . $imageName;

        if (move_uploaded_file($tmpName, $targetFile)) {
            $imageUrls[] = "uploads/" . $imageName;
        }
    }
}
$imageUrlsJson = json_encode($imageUrls);

$stmt = $conn->prepare("INSERT INTO events 
    (user_id, title, description, category, location_type, location_address, zoom_link,
     start_datetime, end_datetime, ticket_price, is_free, capacity, image_urls, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
);

$stmt->bind_param("issssssssdiiss",
    $userId, $title, $description, $category, $locationType, $locationAddress,
    $zoomLink, $startDateTime, $endDateTime, $ticketPrice, $isFree,
    $capacity, $imageUrlsJson, $status
);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Event created successfully!"]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Database insert failed: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
