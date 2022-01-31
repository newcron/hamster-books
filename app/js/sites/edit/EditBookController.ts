import {AuthorService} from "../../data/AuthorService";
import {Author, Book} from "../../data/Book";
import {BookService} from "../../data/BookService";

import {EditBookForm} from "./EditBookForm";
import {EditBookFormComponent} from "./EditBookFormComponent";
import {editBook} from "./FormViewModel";

var view = require("../../ui/view");


export class EditBookController {

    handleExisting = async (id: number) => {

        const authorPromise = new AuthorService().loadAll();
        const bookToEdit = await new BookService().findBookById(id);
        const allAuthors = await authorPromise;

        this.showForm(bookToEdit, allAuthors);


    }


    private showForm(bookToEdit: Book, allAuthors: Author[]) {
        view.show(require("../../../view/book-modify.mustache"),
            editBook(bookToEdit));
        new EditBookFormComponent(new EditBookForm(), allAuthors, bookToEdit).showForm();
    }

    handleCreateNew = async () => {
        const allAuthors = await new AuthorService().loadAll();
        this.showForm(Book.createTransient(), allAuthors);
    }

}

