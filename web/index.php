<?php
ini_set("display_errors", "true");
ini_set("show_errors", "true");

use hamstersbooks\Dispatcher;

require_once __DIR__."/../constants.php";
require_once __DIR__."/../vendor/autoload.php";

(new Dispatcher())->dispatch();
