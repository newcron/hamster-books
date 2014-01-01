define(["crossroads", "listController", "modifyController"], function (crossroads, listController, modifyController) {
    crossroads.addRoute("/read", listController.readBooksController);
    crossroads.addRoute("/unread", listController.unreadBooksController);
    crossroads.addRoute("/new", modifyController.createController);
    crossroads.addRoute("/book/{id}", modifyController.editController);

    return {"start": function () {
        window.onhashchange = handleHashChange;
        handleHashChange();
        function handleHashChange() {
            var hash = window.location.hash.substr(1);
            crossroads.parse(hash);
        }
    }};

});