<?php
# file is only on production and will override the following settings - this will make a switch between local dev settings and prod settings

@include __DIR__ . "/production_constants.php";
@include __DIR__ . "/../production_constants.php";

if (getenv("DB_ENV_CONFIGURED") !== false) {
    @define("DB_HOST", getenv("DB_HOST"));
    @define("DB_USER", getenv("DB_USER"));
    @define("DB_PASS", getenv("DB_PASS"));
    @define("DB_DATABASE", getenv("DB_DATABASE"));

} else {
    @define("DB_HOST", "127.0.0.1");
    @define("DB_USER", "hamstersbooks");
    @define("DB_PASS", "hamstersbooks");
    @define("DB_DATABASE", "hamstersbooks");
}


@define("APP_BASE_URL", getenv("APP_BASE_URL"));
@define("ENFORCE_HTTPS", false);
@define("AWS_PUBLIC_KEY", null);
@define("AWS_SECRET_KEY", null);
@define("AWS_ASSOCIATE_TAG", null);

@define("OAUTH_APP_ID", "107177851889-esgcr2tl8nv5n5qjrfu8mm878d2llnh6.apps.googleusercontent.com");
@define("OAUTH_SECRET", "jF5YSPj25ZS2NFXq2phz4IR7");
@define("APP_BASE_URL", "http://localhost/");
@define("OAUTH_ALLOWED_USER_MAILS", "matthias.huttar@gmx.de;b.berghaeuser@matluc.de;lucy@matluc.de;matthias.huttar@gmail.com;matthias.huttar@googlemail.com;lucype22@googlemail.com");
@define("ENFORCE_HTTPS", true);

define("VIEW_FILE", __DIR__ . "/app-optimized/assets/index.html");

?>
