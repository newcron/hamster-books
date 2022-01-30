import XDate from "xdate";
import { BookNotesTag } from "./Book";

export interface BookApiResponse {
    books: BookApiFormat[];
}


export interface BookApiFormat {

    id: number; 
    title: string; 
    isbn?: string, 
    authors: {
        id: number, 
        firstName?: string,
        middleName?: string,
        lastName?: string
    }[], 
    publisher?: {
        name: string
    }, 
    publicationYear?: number,
    addedDate: string,
    modifiedDate: string,
    pageCount?: number,
    language?: string
    readState: ReadStateApi,
    readNotes?: {
        startDate?:string, 
        finishDate?:string,
        rating?:number,
        comment?:string,
        tags: BookNotesTag[]
    }

}

export enum ReadStateApi {
    READ="READ", UNREAD="UNREAD"
}

