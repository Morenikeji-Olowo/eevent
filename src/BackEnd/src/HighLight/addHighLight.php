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
$title = $_POST['title'] ?? '';
$image = null;

if (empty($title)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "errors" => ["title" => "Title is required"]
    ]);
    exit();
}

if (!empty($_FILES['image']['name'])) {
    $targetDir = "../../../uploads/"; 
    $imageName = time() . "_" . basename($_FILES['image']['name']);
    $targetFile = $targetDir . $imageName;

    if (move_uploaded_file($_FILES['image']['tmp_name'], $targetFile)) {
        $image = "uploads/" . $imageName; 
    } else {
        $image = null; 
    }
}

// Insert into DB
$stmt = $conn->prepare("INSERT INTO highlights (user_id, title, image) VALUES (?, ?, ?)");
$stmt->bind_param("iss", $userId, $title, $image);

if ($stmt->execute()) {
    http_response_code(201);
    echo json_encode(["success" => true, "message" => "Highlight saved successfully"]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Database insert failed: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
