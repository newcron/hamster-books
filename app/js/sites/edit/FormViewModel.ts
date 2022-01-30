import { Book, BookNotesTag, ReadState } from "../../data/Book";
import { DateFormFormatter } from "../../ui/DateFormFormatter";
import XDate from "xdate";

export interface FormViewModel {
    edit: boolean; 
    isRead: boolean;
    bookToEdit?: {
        id: number,
        title?: string, 
        publisher?: string, 
        authors: {id: number, displayName: string}[],
        hasAuthors: boolean
        pageCount?: number,
        isbn?: string,
        publicationYear?:number,
        readInfo?: {
            startDate?: string,
            finishDate?: string,
            rating?: number,
            comment?: string, 
            cancelled: boolean,
            cancelledTagName: string,
            readDateGuessed: boolean,
            readDateGuessedTagName: string,
            monthHighlight: boolean,
            monthHighlightTagName: string
        }
    }
    
}

export function createNewBook() : FormViewModel {
    return {
        edit: false,
        isRead: false,
    }
}

export function editBook(book: Book) : FormViewModel {
    return {
        edit: !book.isTransient(),
        isRead: book.readState == ReadState.READ, 
        bookToEdit: {
            id: book.id, 
            title: book.title, 
            publisher: book.getPublisherName(),
            authors: book.authors.map(a=>{ return {id: a.id, displayName: a.getNameLastNameFirst()}}), 
            hasAuthors: book.authors.length > 0,
            pageCount: book.pageCount, 
            isbn: book.isbn, 
            publicationYear: book.publicationYear,
            readInfo: {
                finishDate: dateToString(book.readNotes.finishDate),
                startDate: dateToString(book.readNotes.startDate), 
                comment: book.readNotes.comment, 
                rating: book.readNotes.rating, 
                cancelled: book.is(BookNotesTag.CANCELLED),
                cancelledTagName: BookNotesTag.CANCELLED,
                readDateGuessed: book.is(BookNotesTag.READ_DATE_GUESSED),
                readDateGuessedTagName: BookNotesTag.READ_DATE_GUESSED,
                monthHighlight: book.is(BookNotesTag.MONTH_FAVOURITE),
                monthHighlightTagName: BookNotesTag.MONTH_FAVOURITE
            }
        }, 
        
    }
}

function dateToString(date?: XDate)  {
    return date === undefined ? undefined : new DateFormFormatter().format(date);
}
