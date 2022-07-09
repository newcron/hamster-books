import XDate from "xdate";
import {ReadState} from "../../data/Book";
import {BookService} from "../../data/BookService";
import {Grouper} from "../../data/grouping/Grouper";

import {UnreadBookListViewModel} from "./BookListViewModel";
import {AddedYearGrouping} from "../../data/grouping/AddedYearGrouping";
import {BookListService} from "../../BookListService";


var view = require("../../ui/view");


export class UnreadBooksController {
    public async handle() {

        const books = await new BookService().loadBooksInState(ReadState.UNREAD);
        const groups = new Grouper(new AddedYearGrouping()).assign(books);

        const now = new XDate();

        const unreadMonths = books.map(b => Math.round(b.addedDate.diffMonths(new XDate()))).reduce((prev, current) => prev + current, 0);

        const viewModel: UnreadBookListViewModel = {
            listName: new BookListService().getSelected().name,
            unreadCount: books.length,
            oldSubCount: books.filter(x => x.addedDate.diffDays(now) > 365).length,
            unreadTime: unreadMonths,
            groups: groups.map(g => {
                return {
                    groupName: g.groupTitle,
                    books: g.books.map(b => {
                        return {
                            id: b.id,
                            title: b.title,
                            subDuration: Math.round(b.addedDate.diffMonths(new XDate())),
                            addedDate: b.addedDate.toString("dd.MM.yyyy"),
                        }
                    })
                }
            })

        }


        view.show(require("../../../view/unread-book-list.mustache"), viewModel);
    }
}
