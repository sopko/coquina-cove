<?php
header('Access-Control-Allow-Origin: *');
header('Cache-Control: public, max-age=300');
header('Content-Type: application/json; charset=utf-8');

$calendar_url = 'https://script.google.com/macros/s/AKfycbyov4-OocFuAOux15jQ_4YB4B1GEIRjLLv17b6kj85J3vPBmrCqZ4NGOeksvpLpza7O/exec';
$calendar = false;

if (function_exists('curl_init')) {
    $request = curl_init($calendar_url);
    curl_setopt($request, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($request, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($request, CURLOPT_TIMEOUT, 10);
    curl_setopt($request, CURLOPT_HTTPHEADER, array('Accept: application/json'));
    $calendar = curl_exec($request);
    $status = curl_getinfo($request, CURLINFO_HTTP_CODE);
    curl_close($request);
    if ($status < 200 || $status >= 300) $calendar = false;
} elseif (ini_get('allow_url_fopen')) {
    $calendar = @file_get_contents($calendar_url);
}

if ($calendar === false) {
    http_response_code(502);
    echo json_encode(array('error' => 'Availability is temporarily unavailable.'));
    exit;
}

echo $calendar;
