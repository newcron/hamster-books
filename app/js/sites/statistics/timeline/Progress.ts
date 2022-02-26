import {Book} from "../../../data/Book";

export class Progress<T> {
    constructor(public amount: T, book: Book) {

    }
}
