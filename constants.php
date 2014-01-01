<?php
@include_once "production_constants.php";

define("DB_HOST", "127.0.0.1");
define("DB_USER", "hamsters_books");
define("DB_PASS", "hamsters_books");
define("DB_DATABASE", "hamsters_books");


if (get_magic_quotes_gpc()) {
    $process = array(&$_GET, &$_POST, &$_COOKIE, &$_REQUEST);
    while (list($key, $val) = each($process)) {
        foreach ($val as $k => $v) {
            unset($process[$key][$k]);
            if (is_array($v)) {
                $process[$key][stripslashes($k)] = $v;
                $process[] = &$process[$key][stripslashes($k)];
            } else {
                $process[$key][stripslashes($k)] = stripslashes($v);
            }
        }
    }
    unset($process);
}


?>