import {BookNotesTag, ReadState} from "../../data/Book";
import {BookService} from "../../data/BookService";
import {Grouper} from "../../data/grouping/Grouper";
import {ReadMonthBasedGrouping} from "../../data/grouping/ReadMonthBasedGrouping";
import {ReadBookListViewModel} from "./BookListViewModel";
import XDate from "xdate";

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
                        let readDuration = undefined;
                        if (b.readNotes.startDate !== undefined && b.readNotes.finishDate !== undefined) {
                            readDuration = Math.round(b.readNotes.startDate.diffDays(b.readNotes.finishDate));
                        } else if (b.readNotes.startDate !== undefined) {
                            readDuration = Math.round(b.readNotes.startDate.diffDays(new XDate()));
                        }

                        let ratings = [];
                        if (b.readNotes.rating !== undefined) {
                            var fullStars = Math.floor(b.readNotes.rating)
                            for (let i = 0; i < fullStars; i++) {
                                ratings.push({isFull: true});
                            }
                            var remaining = b.readNotes.rating - fullStars;

                            if (remaining > 0.75) {
                                ratings.push({isFull: true});
                            } else if (remaining > 0.25) {
                                ratings.push({isFull: false});
                            }

                        }


                        return {
                            id: b.id,
                            title: b.title,
                            readDurationDays: readDuration,
                            authorName: b.getAuthorNamesFirstNameFirst(),
                            addedDate: b.addedDate.toString("dd.MM.yyyy"),
                            readDate: b.readNotes.finishDate ? b.readNotes.finishDate.toString("dd.MM.yyyy") : undefined,
                            rating: b.readNotes.rating,
                            ratingExpanded: ratings,
                            isCancelled: b.is(BookNotesTag.CANCELLED),
                            isMonthHighlight: b.is(BookNotesTag.MONTH_FAVOURITE)
                        }
                    })
                }
            })

        }


        view.show(require("../../../view/read-book-list.mustache"), viewModel);
    }
}
