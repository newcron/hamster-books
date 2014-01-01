(function () {

    define(["view", "jquery", "bookService", "modifyFormHandler"], function (view, $, bookService, modifyFormHandler) {


        return {
            createController: function () {
                modifyFormHandler.showForm({}, function(data) {
                    bookService.create(data, function () {
                        window.location.href = "#/read"
                    });

                });
            },

            editController: function (bookId) {
                bookService.getBook(bookId, function (book) {
                    modifyFormHandler.showForm(book, function (data) {
                        alert("implement me");
                    });

                });
            }
        }


    });


})();