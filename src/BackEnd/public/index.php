<?php
header('Content-Type: application/json');

header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Credentials: true');           // allow cookies (sessions)
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');

if($_SERVER['REGUEST_METHOD']==='OPTIONS'){
    http_response_code(204);
    exit()
}

session_start()

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

if ($path === '/Auth/me.php') {
  require __DIR__ . '/../src/Auth/me.php';
  exit;
}
http_response_code(404);
echo json_encode(['error' => 'Not found']);

?>