import {Book, BookNotesTag} from "../../data/Book";
import {ReadStateApi} from "../../data/BookApiFormat";
import {CreateEditBookApiFormat} from "../../data/CreateEditBookApiFormat";
import {EditBookForm} from "./EditBookForm";
import {PickAuthorComponent} from "./author/PickAuthorComponent";

export class FormDataExtractor {
    constructor(private f: EditBookForm, private pickAuthorComponent: PickAuthorComponent, private b?: Book) {
    }

    extract(): CreateEditBookApiFormat {
        const f = this.f;
        const readState = f.isReadCheckbox().checked().get() ? ReadStateApi.READ : ReadStateApi.UNREAD;
        const tags = f.getForm().find().all("[data-tag-name]:checked").map(e => e.attr("data-tag-name").get() as BookNotesTag);
        return {
            id: this.b.isTransient() ? undefined : this.b.id,
            title: f.titleField().value().get(),
            authors: this.pickAuthorComponent.getSelectedAuthors().map(author =>
                author.isTransient() ?
                    {firstName: author.firstName, middleName: author.middleName, lastName: author.lastName}
                    : {id: author.id}
            ),
            readState: readState,
            isbn: f.isbnField().value().get(),
            pageCount: f.pageCountField().value().map(x => parseInt(x)),
            publicationYear: f.publicationYearField().value().map(parseInt) as number,
            publisher: f.publisherField().value().map((x: string) => {
                return {name: x}
            }),
            readNotes: {
                tags: tags,
                comment: f.commentField().value().get(),
                finishDate: parseDate(f.finishedReadingField().value().get()),
                startDate: parseDate(f.startedReadingField().value().get()),
                rating: f.ratingField().value().map(x => parseFloat(x))
            }
        }
    }
}

function parseDate(date: string) {

    return date === "" ? undefined : date;
}
