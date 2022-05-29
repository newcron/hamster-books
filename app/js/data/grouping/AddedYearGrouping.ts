import {Group, GroupingStrategy, GroupName} from "./Grouper";
import {Book} from "../Book";

export class AddedYearGrouping implements GroupingStrategy {
    assign(book: Book): GroupName | GroupName[] {
        return "" + book.addedDate.getFullYear();
    }

    bookInGroupSortingFunction(a: Book, b: Book): number {
        return a.addedDate.toDate() < b.addedDate.toDate() ? 1 : -1;
    }

    groupFactoryFunction(name: GroupName, books: Book[]): Group {
        return {
            groupTitle: name,
            books: books
        };
    }

    groupSortingFunction(a: Group, b: Group): number {
        return b.groupTitle.localeCompare(a.groupTitle);
    }

}
