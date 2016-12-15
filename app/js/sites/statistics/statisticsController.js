var ui = require('../../ui/ui');
var Chart = require("Chart");
var bookService = require("../../data/bookService");
var sorting = require("../../data/sorting");
var view = require("../../ui/view");
var XDate = require("xdate");


module.exports = {
    showStatisticsController: function () {
        bookService.listBooksInState("READ", function (books) {
            /* var byReadMonth = sorting.sortAndCluster(books, sorting.groupByReadMonth); */
            var reportDataClusters = mapToBuckets(books).map(clusterAnalyzer);
            reportDataClusters.reverse();

            var last2YearData = reportDataClusters;
            // view.show("unread-book-list", sorting.sortAndCluster(data, sorting.groupByAuthor));


            var viewModel = {
                height: window.innerWidth >= 700 ? 300 : 600
            };

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

function mapToBuckets(books) {
    var buckets = [];
    var now = new XDate();
    var lookup = {};

    var historyLength = window.innerWidth >= 700 ? 24 : window.innerWidth >= 400 ? 12 : 6;
    for (var i = 0; i < historyLength; i++) {
        var title = now.toString("MMMM yyyy", "de");
        var bucket = {
            title: title,
            books: []
        };
        buckets.push(bucket);
        now = now.addMonths(-1, false);
        lookup[title] = bucket;
    }

    books.forEach(function(book){
        var bucket = lookup[book.read_date_end.toString("MMMM yyyy", "de")];
        if(bucket) {
            bucket.books.push(book);
        }
    });

    return buckets;
}
