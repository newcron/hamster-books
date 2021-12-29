var ui = require('../../ui/ui');
var bookService = require("../../data/bookService");
var sorting = require("../../data/sorting");
var view = require("../../ui/view");
var XDate = require("xdate");
var Chartist = require("chartist");
const { Book } = require('../../data/Book');
const { ReportDataGenerator } = require('./ReportDataGenerator');


module.exports = {
    showStatisticsController: function () {
        bookService.listBooksInState("READ", function (books) {
            let  monthReadingPerformance = new ReportDataGenerator(books.map(b=>b.bookObject)).generate().getMonthReadingPerformance();
            monthReadingPerformance.filter(x=>x.bookProgress.length).forEach(x=>console.log(x.firstDayInMonth.toString("dd-MM-yyyy"), x.bookProgress))


            var viewModel = {
                height: window.innerWidth >= 700 ? 300 : 600
            };

            view.show(require("../../../view/statistics.mustache"), viewModel);


            var chartOptions = {
                axisX: {
                    labelInterpolationFnc: function (value, index) {
                        return index % 4 == 0 ?  value.getMonthTitle() : null;
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
                            return index % 4 == 0 ? value.getMonthTitle() : null;
                        }
                    }
                }],
                ["screen and (max-width: 450px)", {
                    showLine: false,
                    axisX: {
                        labelInterpolationFnc: function (value, index) {
                            // Will return M, T, W etc. on small screens
                            return index % 6 == 2 ? value.getMonthTitle() : null;
                        }
                    }
                }]

            ];
            new Chartist.Bar("#read-history-books-diagram", {
                    labels: monthReadingPerformance,
                    series: [
                        monthReadingPerformance.map(x=>x.countBooks())
                    ]
                }, chartOptions,
                responsiveOptions
            );

            new Chartist.Bar("#read-history-pages-diagram", {
                    labels: monthReadingPerformance,
                    series: [
                        monthReadingPerformance.map(x=>x.countPages())
                    ]
                }, chartOptions,
                responsiveOptions
            );
        });
    }
};

