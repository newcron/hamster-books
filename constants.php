<?php
# file is only on production and will override the following settings - this will make a switch between local dev settings and prod settings
@include "production_constants.php";

if (getenv("DB_ENV_CONFIGURED") !== false) {
    define("DB_HOST", getenv("DB_HOST"));
    define("DB_USER", getenv("DB_USER"));
    define("DB_PASS", getenv("DB_PASS"));
    define("DB_DATABASE", getenv("DB_DATABASE"));

} else {
    define("DB_HOST", "127.0.0.1");
    define("DB_USER", "hamstersbooks");
    define("DB_PASS", "hamstersbooks");
    define("DB_DATABASE", "hamstersbooks");
}



@define("APP_BASE_URL", getenv("APP_BASE_URL"));
@define("ENFORCE_HTTPS", false);
@define("AWS_PUBLIC_KEY", null);
@define("AWS_SECRET_KEY", null);
@define("AWS_ASSOCIATE_TAG", null);

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
