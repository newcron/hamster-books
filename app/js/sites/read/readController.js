var view = require("../../ui/view");
var bookService = require("../../data/bookService");
var sorting = require("../../data/sorting");


module.exports = {
    readBooksController: function () {
        bookService.listBooksInState("READ", function (data) {
            var clusterModel = sorting.sortAndCluster(data, sorting.groupByReadMonth);
            view.show("read-book-list", clusterModel);
        });
    },

};
