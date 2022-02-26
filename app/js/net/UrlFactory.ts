export class UrlFactory {

    public getBooksByState(state: string) {
        return "api/book/all/by-state/" + state;
    }

    public getAllBooks() {
        return "api/book/all/";
    }

    public getBook(id: number) {
        return "api/book/by-id/" + id;
    }

    public getAuthors() {
        return "api/author"
    }

    public addEditBook() {
        return "api/book"
    }

}
