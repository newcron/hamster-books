<?php
ini_set("display_errors", "true");
ini_set("show_errors", "true");

use hamstersbooks\Dispatcher;

require_once __DIR__ . "/../constants.php";
require_once __DIR__ . "/../vendor/autoload.php";

$httpEnvVar = $_ENV["HTTPS"] ?? "off";
if (ENFORCE_HTTPS === true && $httpEnvVar !== "on") {
    $targetUrl = "https://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
    header("Location: $targetUrl", true, 301);
    exit;
}

(new Dispatcher())->dispatch();
