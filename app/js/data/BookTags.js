class BookTag {

    constructor(id, description) {
        this.id = id;
        this.description = description;
    }

    getId() {
        return this.id;
    }

    getDescription() {
        return this.description;
    }

}

module.exports = class BookTags {
    constructor() {
        this.READ_DATE_GUESSED = new BookTag("READ_DATE_GUESSED", "Lesedatum Geschätzt");
        this.MONTH_FAVOURITE = new BookTag("MONTH_FAVOURITE", "Monatshighlight");
        this.CANCELLED = new BookTag("CANCELLED", "Abgebrochen");
    }


    getAll() {
        return [this.CANCELLED, this.READ_DATE_GUESSED, this.MONTH_FAVOURITE];
    }
};

