define(["crossroads", "listController", "modifyController", "statisticsController",  "mainMenu"], function (crossroads, listController, modifyController, statisticsController, mainMenu) {
    crossroads.addRoute("/read", listController.readBooksController);
    crossroads.addRoute("/unread", listController.unreadBooksController);
    crossroads.addRoute("/new", modifyController.createController);
    crossroads.addRoute("/statistics", statisticsController.showStatisticsController);
    crossroads.addRoute("/book/{id}", modifyController.editController);

    crossroads.routed.add(mainMenu.notifyChange);

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
                console.log("Hash changed to: " + hash);
                crossroads.parse(hash);
            }
        }
    };

});
