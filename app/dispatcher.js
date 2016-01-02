define(["crossroads", "listController", "modifyController", "mainMenu"], function (crossroads, listController, modifyController, mainMenu) {
    crossroads.addRoute("/read", listController.readBooksController);
    crossroads.addRoute("/unread", listController.unreadBooksController);
    crossroads.addRoute("/new", modifyController.createController);
    crossroads.addRoute("/book/{id}", modifyController.editController);

    crossroads.routed.add(mainMenu.notifyChange);

    return {
        "start": function () {
            // facebook appends this hash in the redirect URI. chrome transports this through all redirections.

            if (location.hash == "#_=_") {
                console.log("facebook crap");
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