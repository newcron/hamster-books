import { AuthorService } from "../../data/AuthorService";
import { Book } from "../../data/Book";
import { BookService } from "../../data/BookService";
import { UiToolkit } from "../../ui/UiToolkit";
import { EditBookForm } from "./EditBookForm";
import { EditFormViewController } from "./EditFormViewController";
import { createNewBook, editBook } from "./FormViewModel";
var view = require("../../ui/view");


export class EditBookController {

    async handle(id?: number, authors?: string) {

        


        let bookToEdit : Book = undefined;
        let authorPromise = new AuthorService().loadAll(); 
        if(id!==undefined) {
            bookToEdit = await new BookService().findBookById(id);
            await new AuthorService().loadAll();
        }
        let allAuthors = await authorPromise;
        
        view.show(require("../../../view/book-modify.mustache"), 
            bookToEdit === undefined ? createNewBook() : editBook(bookToEdit))
        
            new EditFormViewController(new EditBookForm(), allAuthors, bookToEdit).showForm();
        
        
    }


}

