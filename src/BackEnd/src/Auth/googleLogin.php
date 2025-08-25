<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require __DIR__ . '/../../vendor/autoload.php';
include '../../../Config/phpDbConfig.php';

use Kreait\Firebase\Factory;

$factory = (new Factory)->withServiceAccount('C:/New Xampp/securekey/eevent-cc7e1-firebase-adminsdk-fbsvc-e8382736d6.json');
$auth = $factory->createAuth();

$data = json_decode(file_get_contents("php://input"), true);
$idToken = $data['token'];

try {
    $verifiedIdToken = $auth->verifyIdToken($idToken);
    $uid = $verifiedIdToken->claims()->get('sub');

    $user = $auth->getUser($uid);
    $email = $user->email;
    $name = $user->displayName;

    // Check if user exists
    $stmt = $conn->prepare("SELECT * FROM users WHERE uid = ?");
    $stmt->bind_param("s", $uid);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // User exists — login
        $stmt = $conn->prepare("UPDATE users SET name=? WHERE uid=?");
        $stmt->bind_param("ss", $name, $uid);
        $stmt->execute();
        $message = "Welcome back!";
    } else {
        // New user — signup
        $stmt = $conn->prepare("INSERT INTO users (uid, name, email) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $uid, $name, $email);
        $stmt->execute();
        $message = "Signed up successfully!";
    }

    session_start();
    $_SESSION['uid'] = $uid;
    $_SESSION['name'] = $name;
    $_SESSION['email'] = $email;

    // Send a single JSON response
    echo json_encode([
        "status" => "success",
        "message" => $message
    ]);

} catch (\Kreait\Firebase\Exception\Auth\FailedToVerifyToken $e) {
    http_response_code(401);
    echo json_encode(["error" => "Invalid token"]);
}
