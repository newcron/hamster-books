<?php
# file is only on production and will override the following settings - this will make a switch between local dev settings and prod settings
@include_once "production_constants.php";

define("DB_HOST", "127.0.0.1");
define("DB_USER", "hamstersbooks");
define("DB_PASS", "hamstersbooks");
define("DB_DATABASE", "hamstersbooks");


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
