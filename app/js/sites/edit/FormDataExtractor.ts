import { Book } from "../../data/Book";
import { ReadState } from "../../data/BookApiFormat";
import { CreateEditBookApiFormat } from "../../data/CreateEditBookApiFormat";
import { EditBookForm } from "./EditBookForm";

export class FormDataExtractor {
    constructor(private f : EditBookForm, private b?:Book) {

    }

    extract() : CreateEditBookApiFormat {
        const f = this.f; 
        const readState = f.isReadCheckbox().checked().get() ? ReadState.READ : ReadState.UNREAD; 
        return {
            id: this.b === undefined ? undefined : this.b.id, 
            title: f.titleField().value().get(), 
            authors: extractAuthors(f.authorIdField().value().get()), // TODO 
            readState: readState, 
            isbn: f.isbnField().value().get(), 
            pageCount: f.pageCountField().value().map(x=>parseInt(x)),
            publicationYear: f.publicationYearField().value().map(parseInt) as number,
            publisher: f.publisherField().value().map((x:string)=>{return {name: x}}),
            readNotes: readState === ReadState.UNREAD ? undefined : {
                tags: [], // todo
                comment: f.commentField().value().get(),
                finishDate: parseDate(f.finishedReadingField().value().get()),
                startDate: parseDate(f.startedReadingField().value().get()), 
                rating: f.ratingField().value().map(x=>parseFloat(x))
            }




        }
    }
}

function parseDate(date: string) {
    return date;
}

function extractAuthors(authors:string) {
    if(authors.endsWith(";")) {
        authors = authors.substring(0, authors.length-1)
    }
    return authors.split(";").map(parseInt);

}