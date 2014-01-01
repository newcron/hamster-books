<!DOCTYPE html>
<html>
<head>
    <title>Hamster's Books</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="app/lib/bootstrap/css/bootstrap.css" rel="stylesheet">

    <link href="app/style/hamstersbooks.less" type="text/css" rel="stylesheet/less">


</head>
<body>

<div class="navbar navbar-inverse navbar-fixed-top" role="navigation" id="app-navbar">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">Hamster's Books</a>
        </div>
        <div class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
                <li><a href="#/read">Gelesen</a></li>
                <li><a href="#/unread">Ungelesen</a></li>
                <li><a href="#/new">Eintragen</a></li>
            </ul>
        </div>
    </div>
</div>

<div class="container l-mainarea" id="app-contentarea">

</div>

<script>
    require = {
        baseUrl: "app/",
        paths: {
            "signals": "lib/signals/signals",
            "mustache": "lib/mustache/mustache",
            "jquery": "lib/jquery2/jquery",
            "crossroads": "lib/crossroads/crossroads",
            "bootstrap": "lib/bootstrap/js/bootstrap-amd",
            "xdate": "lib/xdate/xdate",
            "less" :"//cdnjs.cloudflare.com/ajax/libs/less.js/1.5.0/less.min"
        }
    };

    less= {
        env: "development", // or "production"
        async: false,       // load imports async
        fileAsync: false,   // load imports async when in a page under
        poll: 1000,         // when in watch mode, time in ms between polls
        functions: {},      // user functions, keyed by name
        dumpLineNumbers: "comments", // or "mediaQuery" or "all"
        relativeUrls: true
    }
</script>
<script data-main="hamstersBooks" src="app/lib/requirejs/require.js"></script>
</body>
</html>