<?php
// 1) If there is no user info in the session, say "not authenticated"
if (!isset($_SESSION['user'])) {
  echo json_encode([
    'authenticated' => false
  ]);
  exit;
}

// 2) Otherwise, return the user info we stored earlier
echo json_encode([
  'authenticated' => true,
  'user' => $_SESSION['user']
]);
