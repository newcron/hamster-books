import {Book} from "../../data/Book";
import {Timeline} from "./timeline/Timeline";
import {Progress} from "./timeline/Progress";

export class PagesReadTimelineReport {
    public constructor(private books: Book[]) {
    }

    public generate(): Timeline<number> {
        const t = new Timeline<number>();
        this.books.filter(x => x.isFinishedReading() && x.pageCount !== undefined).forEach(book => {
            let elements = book.getReadTimerange();
            let contributionPerDay = 1 / elements.length;
            elements.forEach(e => t.recognize(e, new Progress<number>(contributionPerDay * book.pageCount, book)));
        });
        return t;
    }


}
