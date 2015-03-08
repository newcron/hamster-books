(function () {
    define(["view", "bookService", "sorting"], function (view, bookService, sorting) {

        return {
            readBooksController: function () {
                bookService.listBooksInState("READ", function (data) {
                    var clusterModel = sorting.sortAndCluster(data, sorting.groupByReadMonth);
                    view.show("read-book-list", clusterModel);
                });
            },

            unreadBooksController: function () {
                bookService.listBooksInState("UNREAD", function (data) {
                    view.show("unread-book-list", sorting.sortAndCluster(data, sorting.groupByAuthor));
                });

            }
        }

    });

})();