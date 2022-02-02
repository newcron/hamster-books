import {ReadState} from "../../data/Book";
import {BookService} from "../../data/BookService";
import {MonthPerformance, ReportDataGenerator} from "./ReportDataGenerator";

const view = require("../../ui/view");
const Chartist = require("chartist");


export class StatisticsController {
    public async handle() {
        const bookService = new BookService();
        const read = await bookService.loadBooksInState(ReadState.READ);

        const report = new ReportDataGenerator(read).generate();
        const monthReadingPerformance = report.getMonthReadingPerformance();
        const monthAddingPerformance = report.getBooksAddedPerMonth();


        var viewModel = {
            height: window.innerWidth >= 700 ? 300 : 600
        };

        view.show(require("../../../view/statistics.mustache"), viewModel);

        new Chartist.Line("#read-history-books-diagram", {
                labels: monthReadingPerformance,
                series: [monthReadingPerformance.map(x => x.countBooks())]
            }, chartOptions(),
            responsiveOptions()
        );

        new Chartist.Line("#read-history-pages-diagram", {
                labels: monthReadingPerformance,
                series: [monthReadingPerformance.map(x => x.countPages())]
            }, chartOptions(),
            responsiveOptions()
        );

        new Chartist.Line("#books-added-diagram", {
            labels: monthAddingPerformance,
            series: [monthAddingPerformance.map(x => x.countBooks())]
        }, chartOptions(), responsiveOptions())
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
        },
        low: 0,
        lineSmooth: Chartist.Interpolation.none(),
    }
}

function responsiveOptions() {
    return [
        ["screen and (max-width: 700px)", {
            showLine: true,
            showPoint: false,

            low: 0,
            axisX: {
                labelInterpolationFnc: function (value: MonthPerformance, index: number) {
                    // Will return M, T, W etc. on small screens
                    return index % 4 == 0 ? value.getMonthTitle() : null;
                }
            }
        }],
        ["screen and (max-width: 450px)", {
            showLine: true,
            low: 0,
            axisX: {
                labelInterpolationFnc: function (value: MonthPerformance, index: number) {
                    // Will return M, T, W etc. on small screens
                    return index % 8 == 2 ? value.getMonthTitle() : null;
                }
            }
        }]

    ];
}
