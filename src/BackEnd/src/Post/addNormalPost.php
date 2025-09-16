<?php
include '../../../Config/phpDbConfig.php';
session_start();
include '../cors.php';

$userId = $_SESSION['userId'] ?? null;
$caption = $_POST['caption'] ?? '';
$image = null;

if (empty($caption)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "errors" => ["caption" => "Caption is required"]
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
$stmt = $conn->prepare("INSERT INTO posts (user_id, caption, image_url) VALUES (?, ?, ?)");
$stmt->bind_param("iss", $userId, $caption, $image);

if ($stmt->execute()) {
    http_response_code(201);
    echo json_encode(["success" => true, "message" => "Post sent successfully"]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Database insert failed: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
