import {BookListService} from "../BookListService";


export class UrlFactory {


    public getBooksByState(state: string) {
        return appendList("api/book/all/by-state/" + state);
    }

    public getAllBooks() {
        return appendList("api/book/all/");
    }

    public getBook(id: number) {
        return "api/book/by-id/" + id;
    }

    public getAuthors() {
        return "api/author"
    }

    public addEditBook() {
        return appendList("api/book")
    }

    deleteBook(bookId: number) {
        return "api/book/by-id/" + bookId;
    }
}

function appendList(str: string) {
    return str + "?bookListId=" + new BookListService().getSelected().id;
}
