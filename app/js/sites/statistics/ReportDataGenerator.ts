import XDate from "xdate";
import {Book, ReadState} from "../../data/Book";

export class ReportDataGenerator {

    private readProgress: Map<string, BookProgress[]> = new Map();
    private byAddedMonth: Map<string, Book[]> = new Map()


    constructor(private data: Book[]) {
    }

    public generate(): Report {


        this.data.filter(book => book.readState === ReadState.READ && book.readNotes !== undefined)
            .filter(book => book.readNotes.finishDate !== undefined)
            .forEach(readBookWithEndDate => {
                if (readBookWithEndDate.readNotes.startDate === undefined) {
                    this.recognize(readBookWithEndDate.readNotes.finishDate, new BookProgress(1, readBookWithEndDate));
                } else {
                    const daysRead = readBookWithEndDate.readNotes.startDate.diffDays(readBookWithEndDate.readNotes.finishDate) + 1;
                    const movingDate = readBookWithEndDate.readNotes.startDate.clone();
                    for (let i = 0; i < daysRead; i++) {
                        this.recognize(movingDate, new BookProgress(1 / daysRead, readBookWithEndDate))
                        movingDate.addDays(1);
                    }
                }
            })

        this.data.forEach(book => {
            var date = book.addedDate.toString("yyyy-MM");
            if (!this.byAddedMonth.has(date)) {
                this.byAddedMonth.set(date, []);
            }
            this.byAddedMonth.get(date).push(book);
        })

        return new Report(this.readProgress, this.byAddedMonth);
    }

    private recognize(effectiveDate: XDate, p: BookProgress): void {
        const key = effectiveDate.toString("yyyy-MM-dd");

        if (!this.readProgress.has(key)) {
            this.readProgress.set(key, []);
        }
        this.readProgress.get(key).push(p);
    }


}


export class Report {
    public constructor(private readonly readProgress: Map<string, BookProgress[]>, private byAddedMonth: Map<string, Book[]>) {
    }

    public getBooksAddedPerMonth(): MonthPerformance[] {
        const perf: MonthPerformance[] = [];
        let firstCurrentMonth = new XDate().addYears(-6).setDate(1).setHours(0).setMinutes(0).setSeconds(0).setMilliseconds(0);
        let iterDate = firstCurrentMonth.clone();
        do {
            const key = iterDate.toString("yyyy-MM");
            const amount = this.byAddedMonth.has(key) ? this.byAddedMonth.get(key).map(x => new BookProgress(1, x)) : [];
            perf.push(new MonthPerformance(iterDate.clone(), amount))
        } while (iterDate.addMonths(1).diffDays(new XDate()) >= 0)

        return perf;
    }

    public getMonthReadingPerformance(): MonthPerformance[] {
        const perf: MonthPerformance[] = [];
        let firstCurrentMonth = new XDate().addYears(-6).setDate(1).setHours(0).setMinutes(0).setSeconds(0).setMilliseconds(0);
        let iterDate = firstCurrentMonth.clone();
        let buffer: BookProgress[] = [];
        do {
            if (!this.isInSameMonth(firstCurrentMonth, iterDate)) {
                perf.push(new MonthPerformance(firstCurrentMonth, buffer))
                buffer = [];
                firstCurrentMonth = iterDate.clone();
            }
            buffer.push(...this.getProgressFor(iterDate));

        } while (iterDate.addDays(1).diffDays(new XDate()) >= 0)

        perf.push(new MonthPerformance(firstCurrentMonth, buffer));


        return perf;
    }

    private getProgressFor(date: XDate): BookProgress[] {
        const key = date.toString("yyyy-MM-dd");
        if (this.readProgress.has(key)) {

            return this.readProgress.get(key);
        }
        return [];
    }

    private isInSameMonth(firstInMonth: XDate, current: XDate): boolean {
        return firstInMonth.getFullYear() == current.getFullYear() && firstInMonth.getMonth() == current.getMonth()
    }

}


export class MonthPerformance {
    public constructor(private firstDayInMonth: XDate, private bookProgress: BookProgress[]) {
    }

    public getMonthTitle() {
        return this.firstDayInMonth.toString("MMM yy", "de");
    }

    public countBooks() {
        return this.bookProgress.map(x => x.percentage).reduce((prev, curr) => prev + curr, 0);
    }

    public countPages() {
        const p = this.bookProgress.map(x => x.percentage * (x.book.pageCount == undefined ? 0 : x.book.pageCount)).reduce((prev, curr) => prev + curr, 0);

        return p;
    }

}

export class BookProgress {
    public constructor(readonly percentage: number, readonly book: Book) {
    }
}

