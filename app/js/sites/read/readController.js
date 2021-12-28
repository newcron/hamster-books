var view = require("../../ui/view");
var bookService = require("../../data/bookService");
var sorting = require("../../data/sorting");


module.exports = {
    readBooksController: function () {
        bookService.listBooksInState("READ", function (data) {
            var clusterModel = sorting.sortAndCluster(data, sorting.groupByReadMonth);
            clusterModel.readCount = data.filter(function(d){
                return d.read_date_end !== null;
            }).length;
            view.show(require("../../../view/read-book-list.mustache"), clusterModel);
        });
    },

};
