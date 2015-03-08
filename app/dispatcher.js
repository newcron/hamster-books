define(["crossroads", "listController", "modifyController", "mainMenu"], function (crossroads, listController, modifyController, mainMenu) {
    crossroads.addRoute("/read", listController.readBooksController);
    crossroads.addRoute("/unread", listController.unreadBooksController);
    crossroads.addRoute("/new", modifyController.createController);
    crossroads.addRoute("/book/{id}", modifyController.editController);

    crossroads.routed.add(mainMenu.notifyChange);

    return {
        "start": function () {
            window.onhashchange = handleHashChange;
            if (!location.hash) {
                location.hash = "#/read";
            } else {
                handleHashChange();
                mainMenu.notifyChange(location.hash.substr(1));
            }

            function handleHashChange() {
                var hash = window.location.hash.substr(1);
                crossroads.parse(hash);
            }
        }};

});