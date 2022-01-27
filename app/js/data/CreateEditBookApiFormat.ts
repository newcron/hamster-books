import { BookNotesTag } from "./Book";
import { ReadState } from "./BookApiFormat";

export interface CreateEditBookApiFormat {
    id?: number, 
    title: string, 
    isbn?: string,
    authors: number[], 
    publisher?: {
        name: string
    }
    publicationYear?: number,
    pageCount?: number,
    readState: ReadState, 
    readNotes?: {
        startDate?: string,
        finishDate?: string, 
        rating?: number,
        comment?: string,
        tags: BookNotesTag[]
    }

    
}