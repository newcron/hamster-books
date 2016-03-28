(function () {

    const tags = ["READ_DATE_GUESSED", "MONTH_FAVOURITE", "CANCELLED"];
    const tagDescriptions = {
        "READ_DATE_GUESSED": "Lesedatum Geschätzt", "MONTH_FAVOURITE": "Monatshighlight", "CANCELLED": "Abgebrochen"
    };

    define(["bookService", "modifyFormHandler"], function (bookService, modifyFormHandler) {


        return {
            createController: function () {
                modifyFormHandler.showForm({tagModel: tagModel([])}, function (data) {
                    bookService.create(data, function () {
                        window.location.href = "#/read"
                    });
                });
            },

            editController: function (bookId) {
                bookService.getBook(bookId, function (book) {

                    book.tagModel = tagModel(parseTags(book));
                    console.log(book);
                    modifyFormHandler.showForm(book, function (data) {
                        bookService.update(data, function (data) {
                            window.location.href = "#/read";
                        });
                    });

                });
            }
        }


    });


    function tagModel(selectedTags) {
        return tags.map(function (tagName) {
            return {name: tagName, selected: selectedTags.indexOf(tagName) !== -1, title: tagDescriptions[tagName]};
        });
    }

    function parseTags(book) {
        if (book.tags && book.tags.trim()) {
            return book.tags.trim().split(",");
        }
        return [];
    }


})();