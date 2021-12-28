var ui = require('../../ui/ui');
var bookService = require("../../data/bookService");
var sorting = require("../../data/sorting");
var view = require("../../ui/view");
var XDate = require("xdate");
var Chartist = require("chartist");


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

            view.show(require("../../../view/statistics.mustache"), viewModel);


            var chartOptions = {
                axisX: {
                    labelInterpolationFnc: function (value, index) {
                        return index % 4 == 0 ?  value.title : null;
                    }
                },
                axisY: {
                    onlyInteger: true
                }
            };
            var responsiveOptions = [
                ["screen and (max-width: 700px)", {
                    showLine: false,
                    axisX: {
                        labelInterpolationFnc: function (value, index) {
                            // Will return M, T, W etc. on small screens
                            return index % 4 == 0 ? value.titleShort : null;
                        }
                    }
                }],
                ["screen and (max-width: 450px)", {
                    showLine: false,
                    axisX: {
                        labelInterpolationFnc: function (value, index) {
                            // Will return M, T, W etc. on small screens
                            return index % 6 == 2 ? value.titleShort : null;
                        }
                    }
                }]

            ];
            new Chartist.Bar("#read-history-books-diagram", {
                    labels: reportDataClusters,
                    series: [
                        reportDataClusters.map(function (d) {
                            return d.count
                        })
                    ]
                }, chartOptions,
                responsiveOptions
            );

            new Chartist.Bar("#read-history-pages-diagram", {
                    labels: reportDataClusters,
                    series: [
                        reportDataClusters.map(function (d) {
                            return d.pages
                        })
                    ]
                }, chartOptions,
                responsiveOptions
            );
        });
    }
};


function clusterAnalyzer(cluster) {
    var stats = cluster.books.reduce(function (previous, current) {
        previous.count++;
        if (current.page_count) {
            previous.pages = previous.pages + parseInt(current.page_count);
        }
        return previous;
    }, {count: 0, pages: 0});

    stats.title = cluster.title;
    stats.titleShort = cluster.titleShort;
    return stats;
}

function mapToBuckets(books) {
    var buckets = [];
    var now = new XDate();
    var lookup = {};

    for (var i = 0; i < 48; i++) {
        var title = now.toString("MMMM yyyy", "de");
        var bucket = {
            title: title,
            titleShort: now.toString("MMM yy", "de"),
            books: []
        };
        buckets.push(bucket);
        now = now.addMonths(-1, false);
        lookup[title] = bucket;
    }

    books.forEach(function (book) {
        if (!book.read_date_end) {
            return;
        }
        var bucket = lookup[book.read_date_end.toString("MMMM yyyy", "de")];
        if (bucket) {
            bucket.books.push(book);
        }
    });

    return buckets;
}
