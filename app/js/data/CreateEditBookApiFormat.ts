import {BookNotesTag} from "./Book";
import {ReadStateApi} from "./BookApiFormat";

export interface CreateEditBookApiFormat {
    id?: number,
    title: string,
    isbn?: string,
    authors: {
        id?: number,
        firstName?: string,
        middleName?: string,
        lastName?: string
    }[],
    publisher?: {
        name: string
    }
    publicationYear?: number,
    pageCount?: number,
    readState: ReadStateApi,
    readNotes?: {
        startDate?: string,
        finishDate?: string,
        rating?: number,
        comment?: string,
        cancelledOnPage?: number,
        tags: BookNotesTag[]
    }
}
