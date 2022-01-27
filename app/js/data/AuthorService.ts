import { AjaxService } from "../net/AjaxRequest";
import { AuthorApiFormat, AuthorApiResponse } from "./AuthorApiFormat";
import { Author, Book, ReadState } from "./Book";
import { BookApiFormat, BookApiResponse } from "./BookApiFormat";

var urls = require("../net/urls");


export class AuthorService {

    public async loadAll() : Promise<Author[]> {

        const url = urls.getAuthors(); 
        const apiResponse : AuthorApiResponse= await new AjaxService().get(url); 
        return this.convert(apiResponse.authors); 

    }

    private convert(data : AuthorApiFormat[] ) : Author[]{
        return data.map(x=>new Author(x.id, x.firstName, x.middleName, x.lastName))
    }
}