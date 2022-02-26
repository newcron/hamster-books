import {AjaxService} from "../net/AjaxRequest";
import {Book, ReadState} from "./Book";
import {BookApiFormat, BookApiResponse} from "./BookApiFormat";
import {UrlFactory} from "../net/UrlFactory";


export class BookService {

    public async loadBooksInState(state: ReadState): Promise<Book[]> {

        const url = new UrlFactory().getBooksByState(state);
        const apiResponse: BookApiResponse = await new AjaxService().get(url);
        return this.convert(apiResponse.books);
    }

    public async loadAllBooks(): Promise<Book[]> {

        const url = new UrlFactory().getAllBooks();
        const apiResponse: BookApiResponse = await new AjaxService().get(url);
        return this.convert(apiResponse.books);

    }

    public async findBookById(id: number): Promise<Book> {
        const url = new UrlFactory().getBook(id);
        const apiResponse: BookApiFormat = await (new AjaxService().get(url));
        return new Book(apiResponse);
    }

    private convert(data: BookApiFormat[]): Book[] {
        return data.map(x => new Book(x));
    }
}
