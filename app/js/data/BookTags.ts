export class BookTag {

    constructor(readonly id: string, readonly description: string) {
        this.id = id;
        this.description = description;
    }



}

export class BookTags {
    private readonly READ_DATE_GUESSED = new BookTag("READ_DATE_GUESSED", "Lesedatum Geschätzt");
    private readonly MONTH_FAVOURITE = new BookTag("MONTH_FAVOURITE", "Monatshighlight"); 
    private readonly CANCELLED = new BookTag("CANCELLED", "Abgebrochen");

    getAll() {
        return [this.CANCELLED, this.READ_DATE_GUESSED, this.MONTH_FAVOURITE];
    }
};

