import XDate from "xdate";
import { BookApiFormat } from "./BookApiFormat";
import { BookTags } from "./BookTags";



export class Book {

    public readonly id: number; 
    public readonly title: string;
    public readonly isbn?: string;
    public readonly authors: Author[]; 
    public readonly publisher?: { readonly name: string }
    public readonly publicationYear?: number; 
    public readonly addedDate: XDate; 
    public readonly modifiedDate: XDate;   
    public readonly pageCount?: number;

    public readonly language? : string
    public readonly readState: ReadState;  

    public readonly readNotes : {
        readonly startDate?:XDate, 
        readonly finishDate?:XDate,
        readonly rating?:number,
        readonly comment?:string,
        readonly tags: BookNotesTag[]
    }

    constructor(apiData: BookApiFormat) {
        this.id = apiData.id; 
        this.title = apiData.title;
        this.isbn = apiData.isbn;
        this.publisher = apiData.publisher
        this.authors = apiData.authors.map(a=>new Author(a.id, a.firstName, a.middleName, a.lastName));
        this.publicationYear = apiData.publicationYear
        this.addedDate = new XDate(apiData.addedDate); 
        this.modifiedDate = new XDate(this.modifiedDate);
        this.readState = apiData.readState as ReadState; 
        this.pageCount = apiData.pageCount == undefined ? undefined : apiData.pageCount;
                
        
        if(apiData.readNotes!==undefined) {
            this.readNotes = {
                startDate: apiData.readNotes.startDate ? new XDate(apiData.readNotes.startDate) : undefined, 
                finishDate: apiData.readNotes.finishDate ? new XDate(apiData.readNotes.finishDate) : undefined, 
                tags: apiData.readNotes.tags,
                rating: apiData.readNotes.rating, 
                comment: apiData.readNotes.comment, 

            }
        } else {
            this.readNotes= {
                tags: [], 
            }
        }
    }

    public isCurrentlyRead() {
        return this.readState == ReadState.READ && this.readNotes.finishDate === undefined;
    }

    public isFinishedReading() {
        return this.readState == ReadState.READ && this.readNotes.finishDate !== undefined
    }

    public getAuthorNamesFirstNameFirst() {
        return this.authors.map(a=>a.getNameFirstNameFirst()).join(", ");
    }

    public getPublisherName() : string {
        return this.publisher === undefined ? undefined : this.publisher.name
    }

    public is(tag: BookNotesTag) : boolean {
        return this.readNotes.tags.indexOf(tag) !== -1;
    }

    


}


export class Author {
    constructor(
        public readonly id: number, 
        public readonly firstName?: string, 
        readonly middleName?: string,
        public readonly lastName?: string
        ) {
    }

    public getNameFirstNameFirst() { 
        return orEmpty(this.firstName)+" "+orEmpty(this.middleName)+" "+orEmpty(this.lastName);
    }

    public getNameLastNameFirst() {
        return orEmpty(this.lastName)+", "+orEmpty(this.firstName)+" "+orEmpty(this.middleName);
    }
}

export enum ReadState {
    READ="READ", UNREAD="UNREAD"
}

export interface ReadingTimespan {
    startDate?: XDate;
    endDate?: XDate; 

}


export enum BookNotesTag {
    READ_DATE_GUESSED="READ_DATE_GUESSED", 
    MONTH_FAVOURITE="MONTH_FAVOURITE", 
    CANCELLED="CANCELLED"

}


function orEmpty(value?: string) {
    return value === undefined ? "" : value;
}