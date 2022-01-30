import XDate from "xdate";
import { ReadState } from "../../data/Book";
import { BookService } from "../../data/BookService";
import { AuthorBasedGrouping } from "../../data/grouping/AuthorBasedGrouping";
import { Grouper } from "../../data/grouping/Grouper";

import { UnreadBookListViewModel } from "./BookListViewModel";

var sorting = require("../../data/sorting");
var view = require("../../ui/view");


export class UnreadBooksController { 
    public async handle() {
        
        const books = await new BookService().loadBooksInState(ReadState.UNREAD); 
        const groups = new Grouper(new AuthorBasedGrouping()).assign(books);

        const now = new XDate(); 

        const viewModel : UnreadBookListViewModel = {
            unreadCount : books.length, 
            oldSubCount: books.filter(x=>x.addedDate.diffDays(now) > 365).length,
            groups: groups.map(g=>{
                return {
                    groupName: g.groupTitle,
                    books: g.books.map(b=>{
                        return {
                            id: b.id,
                            title: b.title, 
                            addedDate: b.addedDate.toString("dd.MM.yyyy"), 
                        }
                    })
                }
            })

        }
        

        view.show(require("../../../view/unread-book-list.mustache"), viewModel);
    }
}