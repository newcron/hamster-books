<?php
ini_set("display_errors", "true");
ini_set("show_errors", "true");

use hamstersbooks\api\Dispatcher;

require_once __DIR__."/../constants.php";
require_once __DIR__."/../vendor/autoload.php";

(new Dispatcher())->dispatch();

/*
<!DOCTYPE html>
<html>
<head>
    <title>Hamster's Books</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link href="style/hamstersbooks.css" type="text/css" rel="stylesheet">


</head>
<body>

<div class="main-navigation" id="main-navigation">
    <div class="l-row">
        <div class="twentyfour col">

            <h1 class="main-navigation-title">Hamster's Books</h1>
            <ul class="main-navigation-menu">
                <li id="read-books-action" class="main-navigation-menu-item is-main-menu-item"><a href="#/read">Gelesen</a></li>
                <li id="unread-books-action" class="main-navigation-menu-item is-main-menu-item"><a href="#/unread">Ungelesen</a></li>
                <li id="new-book-action" class="main-navigation-menu-item is-main-menu-item"><a href="#/new">Eintragen</a></li>
            </ul>

        </div>
    </div>
</div>

<div class="l-row l-mainarea" id="app-contentarea">

</div>

<script src="js/hamstersbooks-full.js"></script>
<script>
    require(["hamstersBooks"]);
</script>

</body>
</html>

*/