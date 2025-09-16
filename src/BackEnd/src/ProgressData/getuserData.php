<?php
include '../../../Config/phpDbConfig.php'; // <- where $conn = new mysqli(...);
include '../cors.php';
session_start(); // make sure session is active


if (!isset($_SESSION['userId'])) {
    echo json_encode([
        "success" => false,
        "message" => "Not logged in"
    ]);
    exit;
}

// prepare statement
$stmt = $conn->prepare("SELECT * FROM user_profiles WHERE user_id = ?");
$stmt->bind_param("i", $_SESSION['userId']);

if ($stmt->execute()) {
    $result = $stmt->get_result();
    $userData = $result->fetch_assoc();

    if ($userData) {
        echo json_encode([
            "success" => true,
            "data" => $userData
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "User not found"
        ]);
    }
} else {
    echo json_encode([
        "success" => false,
        "message" => "Query failed"
    ]);
}

$stmt->close();
$conn->close();
?>
