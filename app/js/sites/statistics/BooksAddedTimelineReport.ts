import {Book} from "../../data/Book";
import {Timeline} from "./timeline/Timeline";
import {Progress} from "./timeline/Progress";
import {DateOnly} from "../../data/DateOnly";

export class BooksAddedTimelineReport {
    public constructor(private books: Book[]) {
    }

    public generate(): Timeline<number> {
        const t = new Timeline<number>();
        this.books.forEach(book => {
            t.recognize(DateOnly.fromDate(book.addedDate.toDate()), new Progress<number>(1, book));
        });
        return t;
    }


}
