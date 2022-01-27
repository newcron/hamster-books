import { ReadState } from "../../data/Book";
import { BookService } from "../../data/BookService";
import { MonthPerformance, ReportDataGenerator } from "./ReportDataGenerator";
const ui = require('../../ui/ui');
const view = require("../../ui/view");
const Chartist = require("chartist");




export class StatisticsController {
    public async handle() {
        const bookService = new BookService();
        const read = await bookService.loadBooksInState(ReadState.READ);

        const monthReadingPerformance = new ReportDataGenerator(read).generate().getMonthReadingPerformance();


        var viewModel = {
            height: window.innerWidth >= 700 ? 300 : 600
        };

        view.show(require("../../../view/statistics.mustache"), viewModel);

        new Chartist.Bar("#read-history-books-diagram", {
            labels: monthReadingPerformance,
            series: [monthReadingPerformance.map(x => x.countBooks())]
        }, chartOptions(),
            responsiveOptions()
        );

        new Chartist.Bar("#read-history-pages-diagram", {
            labels: monthReadingPerformance,
            series: [monthReadingPerformance.map(x => x.countPages())]
        }, chartOptions(),
            responsiveOptions()
        );
    }

   
}


function chartOptions() {
    return {
        axisX: {
            labelInterpolationFnc: function (value: MonthPerformance, index: number) {
                return index % 4 == 0 ? value.getMonthTitle() : null;
            }
        },
        axisY: {
            onlyInteger: true
        }
    }
}

function responsiveOptions() {
    return [
        ["screen and (max-width: 700px)", {
            showLine: false,
            axisX: {
                labelInterpolationFnc: function (value: MonthPerformance, index: number) {
                    // Will return M, T, W etc. on small screens
                    return index % 4 == 0 ? value.getMonthTitle() : null;
                }
            }
        }],
        ["screen and (max-width: 450px)", {
            showLine: false,
            axisX: {
                labelInterpolationFnc: function (value: MonthPerformance, index: number) {
                    // Will return M, T, W etc. on small screens
                    return index % 6 == 2 ? value.getMonthTitle() : null;
                }
            }
        }]

    ];
}