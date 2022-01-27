import { AjaxService } from "../net/AjaxRequest";
import { Book, ReadState } from "./Book";
import { BookApiFormat, BookApiResponse } from "./BookApiFormat";

var urls = require("../net/urls");


export class BookService {

    public async loadBooksInState(state: ReadState) : Promise<Book[]> {

        const url = urls.getBooksByState(state); 
        const apiResponse : BookApiResponse= await new AjaxService().get(url); 
        // const r = await ajax.get(urls.getBooksByState(state)) as BookApiResponse; 
        return this.convert(apiResponse.books); 

    }

    public async findBookById(id: number) : Promise<Book> {
        const url = urls.getBook(id); 
        const apiResponse : BookApiFormat = await(new AjaxService().get(url)); 
        return new Book(apiResponse);
    }

    private convert(data : BookApiFormat[] ) : Book[]{
        return data.map(x=>new Book(x));
    }
}