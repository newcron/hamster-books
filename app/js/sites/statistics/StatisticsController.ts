import {BookService} from "../../data/BookService";
import {BooksAddedTimelineReport} from "./BooksAddedTimelineReport";
import {UiToolkit} from "../../ui/UiToolkit";
import {CategoryScale, Chart, Legend, LinearScale, LineController, LineElement, PointElement, Tooltip} from "chart.js";
import {DateOnly} from "../../data/DateOnly";
import {PagesReadTimelineReport} from "./PagesReadTimelineReport";
import {BooksReadTimelineReport} from "./BooksReadTimelineReport";
import {SubTimelineReport} from "./SubTimelineReport";
import {MonthOnly} from "../../data/MonthOnly";

const view = require("../../ui/view");
Chart.register(LineController, Tooltip, CategoryScale, LinearScale, PointElement, LineElement, Legend);

export class StatisticsController {
    public async handle() {

        const bookService = new BookService();
        const allBooks = await bookService.loadAllBooks();


        view.show(require("../../../view/statistics.mustache"));

        const startDate = DateOnly.today().addYears(-2);


        let pagesHistory = new PagesReadTimelineReport(allBooks).generate().monthlyHistory(startDate);
        let bookHistory = new BooksReadTimelineReport(allBooks).generate().monthlyHistory(startDate);
        let addedHistory = new BooksAddedTimelineReport(allBooks).generate().monthlyHistory(startDate);
        let subHistory = new SubTimelineReport(allBooks).generate().monthlyHistory(MonthOnly.fromDate(startDate).firstOfMonth());


        new Chart(context("read-history-books-diagram"), {
            type: "line",
            data: {
                labels: pagesHistory.map(x => x.date.asString()),
                datasets: [{
                    label: "Gelesene Bücher",
                    data: bookHistory.map(x => Math.round(x.sum() * 10) / 10),
                    borderColor: "#7A9558",
                    backgroundColor: "#7A9558",
                }, {
                    label: "Hinzugefügte Bücher",
                    borderColor: "#E45308",
                    backgroundColor: "#E45308",
                    data: addedHistory.map(x => x.sum()),
                }

                ]
            },
            options: {
                responsive: true,
                interaction: {
                    mode: 'index',
                    intersect: false
                }

            }
        });

        new Chart(context("read-pages-history-books-diagram"), {
            type: "line",
            data: {
                labels: pagesHistory.map(x => x.date.asString()),
                datasets: [{
                    label: "Gelesene Seiten",
                    data: pagesHistory.map(x => Math.round(x.sum())),
                    borderColor: "#00247B",
                    backgroundColor: "#00247B",

                }
                ]
            },
            options: {
                responsive: true,
            }
        });

        new Chart(context("sub-history-books-diagram"), {
            type: "line",
            data: {
                labels: subHistory.map(x => x.date.asString()),
                datasets: [{
                    label: "SUB",
                    data: subHistory.map(x => x.sum()),
                    borderColor: "#00247B",
                    backgroundColor: "#00247B",
                }]
            },
            options: {
                responsive: true,
            }
        });
    }


}

function context(id: string) {
    const el = new UiToolkit().find().byId(id).element as HTMLCanvasElement;
    return el.getContext("2d");
}

