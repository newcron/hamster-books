import {Author} from "../../../data/Book";
import {AuthorReference, AuthorReferenceParser} from "./AuthorReferenceParser";

interface Result {
    author: Author;
    perfectMatch: boolean;
}

export class AuthorSuggester {
    private refParser: AuthorReferenceParser;

    public constructor(private authors: Author[]) {
        this.refParser = new AuthorReferenceParser();
    }

    public suggest(input: string): Result[] {
        if (input.length < 3) {
            return [];

        }
        const author = this.refParser.parse(input);

        if (author.firstName === undefined) {
            return this.searchAuthorLastNameStartingWith(author.lastName).map(a => ({perfectMatch: false, author: a}));
        }

        return this.searchAuthorLastNameFirstNameStartingWith(author);

    }

    searchAuthorLastNameFirstNameStartingWith(parsedAuthorInfo: AuthorReference): Result[] {

        const firstNameIsAbbrev = parsedAuthorInfo.firstName.length === 1 || (parsedAuthorInfo.firstName.length == 2 && parsedAuthorInfo.firstName.endsWith("."));

        return this.authors.filter(
            a =>
                isSameButPresent(a.lastName, parsedAuthorInfo.lastName) &&
                firstNameIsAbbrev ? startsWith(a.firstName, parsedAuthorInfo.firstName) : isSameButPresent(a.firstName, parsedAuthorInfo.firstName)
        ).map(x => ({
            author: x,
            perfectMatch:
                isSameButOptional(x.firstName, parsedAuthorInfo.firstName) &&
                isSameButOptional(x.middleName, parsedAuthorInfo.middleName) &&
                isSameButOptional(x.lastName, parsedAuthorInfo.lastName)
        }));
    }

    searchAuthorLastNameStartingWith(input: string): Author[] {
        const searchInput = input.toLocaleLowerCase();
        return this.authors.filter(a => a.lastName !== undefined && a.lastName.toLocaleLowerCase().startsWith(searchInput));
    }
}

function isSameButPresent(a: string, b: string) {
    if (a === undefined || b === undefined) {
        return false;
    }
    return a.toLocaleLowerCase() === b.toLocaleLowerCase()
}

function isSameButOptional(a: string, b: string) {
    if (a === undefined && b === undefined) {
        return true;
    }
    if (a === undefined || b === undefined) {
        return false;
    }
    return a.toLocaleLowerCase() === b.toLocaleLowerCase()
}


function startsWith(a: string, b: string) {
    if (a == undefined || b == undefined) {
        return false;
    }
    return a.toLocaleLowerCase().startsWith(b.toLocaleLowerCase());
}

