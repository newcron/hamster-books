var bookService = require("../../data/bookService");
var modifyFormHandler = require("./modifyFormHandler");

var BookTags = require('../../data/BookTags');





module.exports = {
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
            modifyFormHandler.showForm(book, function (data) {
                bookService.update(data, function () {
                    window.location.href = "#/read";
                });
            });

        });
    }
};


function tagModel(selectedTags) {
    return new BookTags().getAll().map(function (tag) {
        return {name: tag.getId(), selected: selectedTags.indexOf(tag.getId()) !== -1, title: tag.getDescription()};
    });
}

function parseTags(book) {
    if (book.tags && book.tags.trim()) {
        return book.tags.trim().split(",");
    }
    return [];
}

