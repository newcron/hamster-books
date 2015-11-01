<!DOCTYPE html>
<html>
<head>
    <title>Hamster's Books</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link href="app-optimized/style/hamstersbooks.css?v=160202a930e00737a6438d3240885103" type="text/css" rel="stylesheet">


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

<script src="app-optimized/js/hamstersbooks-full.js?v=ac4786ec88bc96dcc486d28ba8cde83c"></script>
<script>
    require(["hamstersBooks"]);
</script>

</body>
</html>