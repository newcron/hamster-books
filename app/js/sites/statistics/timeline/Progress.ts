import {Book} from "../../../data/Book";

export class Progress<T> {
    constructor(public readonly amount: T, public readonly book: Book) {

    }
}
