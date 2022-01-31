import {ReadState} from "../../data/Book";
import {BookService} from "../../data/BookService";
import {Grouper} from "../../data/grouping/Grouper";
import {ReadMonthBasedGrouping} from "../../data/grouping/ReadMonthBasedGrouping";
import {ReadBookListViewModel} from "./BookListViewModel";

var view = require("../../ui/view");


export class ReadBooksController {
    public async handle() {

        const books = await new BookService().loadBooksInState(ReadState.READ);
        const groups = new Grouper(new ReadMonthBasedGrouping()).assign(books);

        const viewModel: ReadBookListViewModel = {
            readCount: books.filter(x => x.isFinishedReading()).length,
            readingCount: books.filter(x => x.isCurrentlyRead()).length,
            groups: groups.map(g => {
                return {
                    groupName: g.groupTitle,
                    books: g.books.map(b => {
                        return {
                            id: b.id,
                            title: b.title,
                            authorName: b.getAuthorNamesFirstNameFirst(),
                            addedDate: b.addedDate.toString("dd.MM.yyyy"),
                            readDate: b.readNotes.finishDate ? b.readNotes.finishDate.toString("dd.MM.yyyy") : undefined,
                            rating: b.readNotes.rating
                        }
                    })
                }
            })

        }


        view.show(require("../../../view/read-book-list.mustache"), viewModel);
    }
}
