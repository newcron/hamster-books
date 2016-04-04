var view = require("../../ui/view");
var bookService = require("../../data/bookService");
var sorting = require("../../data/sorting");

module.exports = {
    unreadBooksController: function () {
        bookService.listBooksInState("UNREAD", function (data) {
            view.show("unread-book-list", sorting.sortAndCluster(data, sorting.groupByAuthor));
        });

    }
}
