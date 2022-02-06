import {Book, BookNotesTag, ReadState} from "../../data/Book";
import {DateFormFormatter} from "../../ui/DateFormFormatter";
import XDate from "xdate";

export interface FormViewModel {
    edit: boolean;
    isRead: boolean;
    creationDate: string,
    lastEditDate: string,
    bookToEdit?: {
        id: number,
        title?: string,
        publisher?: string,
        authors: { id: number, displayName: string }[],
        hasAuthors: boolean
        pageCount?: number,
        isbn?: string,
        publicationYear?: number,
        starOptions: {
            val: number,
            label: string,
            selected: boolean
        }[]
        readInfo?: {
            startDate?: string,
            finishDate?: string,
            rating?: number,
            comment?: string,
            cancelled: boolean,
            cancelledOnPage?: number,
            cancelledTagName: string,
            readDateGuessed: boolean,
            readDateGuessedTagName: string,
            monthHighlight: boolean,
            monthHighlightTagName: string
        }
    }

}

export function editBook(book: Book): FormViewModel {

    var starOptions = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map(value => ({
        val: value,
        selected: book.readNotes.rating !== undefined && Math.abs(book.readNotes.rating - value) <= 0.25,
        label: value === 1 ? "1 Stern" : value + " Sterne"
    }))


    return {
        edit: !book.isTransient(),
        creationDate: book.addedDate === undefined ? undefined : book.addedDate.toString("dd.MM.yyyy"),
        lastEditDate: book.modifiedDate === undefined ? undefined : book.modifiedDate.toString("dd.MM.yyyy"),
        isRead: book.readState == ReadState.READ,
        bookToEdit: {
            id: book.id,
            title: book.title,
            publisher: book.getPublisherName(),
            authors: book.authors.map(a => {
                return {id: a.id, displayName: a.getNameLastNameFirst()}
            }),
            hasAuthors: book.authors.length > 0,
            pageCount: book.pageCount,
            isbn: book.isbn,
            publicationYear: book.publicationYear,
            starOptions: starOptions,
            readInfo: {
                finishDate: dateToString(book.readNotes.finishDate),
                startDate: dateToString(book.readNotes.startDate),
                comment: book.readNotes.comment,
                rating: book.readNotes.rating,
                cancelled: book.is(BookNotesTag.CANCELLED),
                cancelledOnPage: book.readNotes.cancelledOnPage,
                cancelledTagName: BookNotesTag.CANCELLED,
                readDateGuessed: book.is(BookNotesTag.READ_DATE_GUESSED),
                readDateGuessedTagName: BookNotesTag.READ_DATE_GUESSED,
                monthHighlight: book.is(BookNotesTag.MONTH_FAVOURITE),
                monthHighlightTagName: BookNotesTag.MONTH_FAVOURITE
            }
        },

    }
}

function dateToString(date?: XDate) {
    return date === undefined ? undefined : new DateFormFormatter().format(date);
}
