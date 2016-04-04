var ui = require('../../ui/ui');
var Chart = require("Chart");
var bookService = require("../../data/bookService");
var sorting = require("../../data/sorting");
var view = require("../../ui/view");

module.exports = {
    showStatisticsController: function () {
        bookService.listBooksInState("READ", function (books) {
            var byReadMonth = sorting.sortAndCluster(books, sorting.groupByReadMonth);
            var reportDataClusters = byReadMonth.clusters.map(clusterAnalyzer);
            reportDataClusters.reverse();


            var last2YearData = reportDataClusters.slice().splice(reportDataClusters.length - 25, 25);
            // view.show("unread-book-list", sorting.sortAndCluster(data, sorting.groupByAuthor));


            var viewModel = {};

            view.show("statistics", viewModel);

            var config = {
                showToolTips: false,
                tooltipXPadding: 1,
                responsive: true,
                scaleBeginAtZero: true,
                bezierCurve: false,
                maintainAspectRatio: true
            };


            new Chart(ui.find().byId("read-history-books-chart").getDrawingContext()).Line({
                labels: last2YearData.map(function (element) {
                    return element.title
                }),
                datasets: [
                    {
                        label: "Bücher",
                        fillColor: "rgba(207,205,193,0.2)",
                        strokeColor: "#cfcdc1",
                        pointColor: "#cfcdc1",
                        pointStrokeColor: "rgb(207,205,193)",
                        pointHighlightFill: "#cfcdc1",
                        pointHighlightStroke: "black",
                        data: last2YearData.map(function (element) {
                            return element.count
                        })
                    }
                ]
            }, config);

            new Chart(ui.find().byId("read-history-pages-chart").getDrawingContext()).Line({
                labels: last2YearData.map(function (element) {
                    return element.title
                }),
                datasets: [
                    {
                        label: "Seiten",

                        fillColor: "rgba(207,205,193,0.2)",
                        strokeColor: "#cfcdc1",
                        pointColor: "#cfcdc1",
                        pointStrokeColor: "rgb(207,205,193)",
                        pointHighlightFill: "#cfcdc1",
                        pointHighlightStroke: "black",
                        data: last2YearData.map(function (element) {
                            return element.pages
                        })
                    }
                ]
            }, config);

        });
    }
};


function clusterAnalyzer(cluster) {
    var stats = cluster.books.reduce(function (previous, current) {
        previous.count++;
        if (current.pageCount) {
            previous.pages = previous.pages + parseInt(current.pageCount);
        }
        return previous;
    }, {count: 0, pages: 0});

    stats.title = cluster.title;

    return stats;
}
