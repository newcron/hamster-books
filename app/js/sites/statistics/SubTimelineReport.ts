import {Book, ReadState} from "../../data/Book";
import {Timeline} from "./timeline/Timeline";
import {Progress} from "./timeline/Progress";
import {DateOnly} from "../../data/DateOnly";
import {MonthOnly} from "../../data/MonthOnly";

export class SubTimelineReport {
    public constructor(private books: Book[]) {
    }

    public generate(): Timeline<number> {
        const t = new Timeline<number>();
        let previousSub = 0;
        this.books.forEach(x => {
            t.recognize(DateOnly.fromDate(x.addedDate.toDate()), new Progress<number>(1, x))
            if (x.readState === ReadState.READ && x.readNotes.startDate !== undefined) {
                t.recognize(DateOnly.fromDate(x.readNotes.startDate.toDate()), new Progress<number>(-1, x));
            } else if (x.readState === ReadState.UNREAD) {
                previousSub++;
            }
        });
        let monthHistory = t.monthlyHistory(undefined);
        const derivedTimeline = new Timeline<number>();

        const now = MonthOnly.fromDate(DateOnly.today());
        monthHistory = monthHistory.reverse();

        for (let m of monthHistory) {

            const newSub = previousSub - m.sum();
            derivedTimeline.recognize(m.date.firstOfMonth(), new Progress<number>(newSub, undefined));
            previousSub = newSub;

        }

        return derivedTimeline;
    }


}
