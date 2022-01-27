import { Author, Book } from "../Book";
import { Group, Grouper, GroupingStrategy, GroupName } from "./Grouper";

export class AuthorBasedGrouping implements GroupingStrategy {
    assign(book: Book): GroupName[] {
        return book.authors.map(a=>""+a.id);
    }
    groupFactoryFunction(name: string, books: Book[]): AuthorGroup {
        
        const author = findAuthor(parseInt(name), books[0]); 
       
        return {
            author: author, 
            books: books, 
            groupTitle: author.getNameFirstNameFirst()
        }
    }

    groupSortingFunction(a: AuthorGroup, b: AuthorGroup): number {
        return a.author.getNameLastNameFirst() > b.author.getNameLastNameFirst() ? 1 : -1
    }

}

interface AuthorGroup extends Group {
    author: Author
}

function findAuthor(authorId: number, book: Book ) : Author {
    return book.authors.filter(a=>a.id == authorId)[0];
}