<?php
include '../../../Config/phpDbConfig.php';
session_start();

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

$userId = $_SESSION['userId'] ?? null;
$post_Id = $data['post_Id'] ?? null;

if (!$userId || !$post_Id) {
    echo json_encode(["success" => false, "message" => "Missing data"]);
    exit();
}

$checkSql = "SELECT like_id FROM post_likes WHERE post_id = ? AND user_id = ?";
$checkStmt = $conn->prepare($checkSql);
$checkStmt->bind_param("ii", $post_Id, $userId);
$checkStmt->execute();
$checkResult = $checkStmt->get_result();

if ($checkResult->num_rows > 0) {

    $row = $checkResult->fetch_assoc();
    $likeId = $row['like_id'];

    $deleteSql = "DELETE FROM post_likes WHERE like_id = ?";
    $deleteStmt = $conn->prepare($deleteSql);
    $deleteStmt->bind_param("i", $likeId);
    $deleteStmt->execute();

    echo json_encode([
        "success" => true,
        "action" => "unliked",
        "like_id" => $likeId
    ]);
} else {
    $insertSql = "INSERT INTO post_likes (post_id, user_id, created_at) 
                  VALUES (?, ?, NOW())";
    $insertStmt = $conn->prepare($insertSql);
    $insertStmt->bind_param("ii", $post_Id, $userId);

    if (!$insertStmt->execute()) {
        echo json_encode(["success" => false, "message" => "DB insert failed"]);
        exit();
    }

    $newId = $insertStmt->insert_id;
    $insertStmt->close();

    $sql = "
    SELECT c.like_id, c.created_at,
           u.user_id, u.username, u.displayName, u.pfp
    FROM post_likes c
    JOIN user_profiles u ON u.user_id = c.user_id
    WHERE c.like_id = ?
    ";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $newId);
    $stmt->execute();
    $result = $stmt->get_result();
    $newLike = $result->fetch_assoc();

    echo json_encode([
        "success" => true,
        "action" => "liked",
        "like" => $newLike
    ]);
}
