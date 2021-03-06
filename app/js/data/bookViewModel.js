module.exports = {
    forBook: function (book) {
        return {
            id: book.id,
            title: book.title,
            rating: book.read_rating > 0 ? book.read_rating.replace(/\./, ',') : null,
            author: (book.first_name == null ? "" : book.first_name) + " " + (book.middle_name == null ? "" : book.middle_name ) + " " + (book.last_name == null ? "" : book.last_name),
            readDate: formatDate(book.read_date_end),
            addedDate: formatDate(book.added_date),
            pageCount: book.page_count
        };
    }
};

function formatDate(date) {
    if (!date) {
        return null;
    }
    return date.toString("dd.MM.yyyy");
}
