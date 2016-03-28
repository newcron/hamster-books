define(["listController", "modifyController", "statisticsController", "mainMenu"], function (listController, modifyController, statisticsController, mainMenu) {
    return {
        "start": function () {

            if (location.hash == "#_=_") {
                // facebook appends this hash in the redirect URI. chrome transports this through all redirections.
                location.hash = "";
            }

            window.onhashchange = handleHashChange;
            if (!location.hash) {
                location.hash = "#/read";
            } else {
                handleHashChange();
                mainMenu.notifyChange(location.hash.substr(1));
            }

            function handleHashChange() {
                var hash = window.location.hash.substr(1);

                var routes = [
                    {
                        pattern: /^\/read$/,
                        handler: listController.readBooksController
                    },
                    {
                        pattern: /^\/unread$/,
                        handler: listController.unreadBooksController
                    },
                    {
                        pattern: /^\/new$/,
                        handler: modifyController.createController
                    },
                    {
                        pattern: /^\/statistics/,
                        handler: statisticsController.showStatisticsController
                    },
                    {
                        pattern: /^\/book\/([0-9]+)$/,
                        handler: modifyController.editController

                    }
                ];

                for(var i=0; i<routes.length; i++) {
                    var handler = routes[i];
                    var match = hash.match(handler.pattern);
                    if(match!==null) {
                        var handlerArgs = match.splice(1);
                        handler.handler.apply(this, handlerArgs);
                    }
                }

            }
        }
    };

});
