import {AjaxService} from "../net/AjaxRequest";
import {AuthorApiFormat, AuthorApiResponse} from "./AuthorApiFormat";
import {Author} from "./Book";
import {UrlFactory} from "../net/UrlFactory";


export class AuthorService {

    public async loadAll(): Promise<Author[]> {

        const url = new UrlFactory().getAuthors();
        const apiResponse: AuthorApiResponse = await new AjaxService().get(url);
        return this.convert(apiResponse.authors);

    }

    private convert(data: AuthorApiFormat[]): Author[] {
        return data.map(x => new Author(x.id, x.firstName, x.middleName, x.lastName))
    }
}
