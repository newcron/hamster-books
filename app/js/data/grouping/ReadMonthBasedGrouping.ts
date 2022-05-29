import {Book} from "../Book";
import {Group, GroupingStrategy, GroupName} from "./Grouper";

export class ReadMonthBasedGrouping implements GroupingStrategy {

    public assign(book: Book): GroupName {
        if (book.isCurrentlyRead()) {
            return "Wird Gelesen";
        }
        return book.readNotes.finishDate.toString("MMMM yyyy", "de")
    }

    groupFactoryFunction(name: GroupName, books: Book[]): Group {

        const book = books[0];
        let sortValue = Number.MAX_VALUE;
        if (book.isFinishedReading()) {
            sortValue = book.readNotes.finishDate.getTime();
        }

        return new BookGroup(name, books, sortValue)
    }

    groupSortingFunction(a: Group, b: Group): number {
        return (b as BookGroup).timestamp - (a as BookGroup).timestamp;
    }

    bookInGroupSortingFunction(a: Book, b: Book): number {
        if (a.isFinishedReading() != b.isFinishedReading()) {
            return a.isFinishedReading() ? 1 : -1;
        }
        if (!a.isFinishedReading() && !b.isFinishedReading()) {
            return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
        }
        return b.readNotes.finishDate.getTime() - a.readNotes.finishDate.getTime();
    }


}

class BookGroup implements Group {
    public constructor(public groupTitle: GroupName, public books: Book[], public timestamp: number) {
    }

}
