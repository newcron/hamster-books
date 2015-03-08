(function () {
    define(["jquery", "urls"], function ($, urls) {

        return {
            listBooksInState: function (state, callback) {
                $.ajax(urls.getBooksByState(state), {
                    success: convertList(callback),
                    error: failRequest
                });
            },

            getBook: function (id, callback) {
                $.ajax(urls.getBook(id), {
                    success: convertSingle(callback),
                    error: failRequest
                });
            },

            create: function (book, callback) {
                $.ajax(urls.createBook(), {
                    method: "POST",
                    data: book,
                    success: callback,
                    error: failRequest
                });
            },

            update: function(book, callback) {
                $.ajax(urls.updateBook(book.id), {
                    method: "POST",
                    data: book,
                    success: callback,
                    error: failRequest
                });
            }
        };

    });

    function convertList(callback) {
        return function (data) {
            $.each(data, function () {
                fromApiToLocalModel(this)
            });
            callback(data);
        }
    }

    function convertSingle(callback) {
        return function (data) {
            fromApiToLocalModel(data);
            callback(data);
        }
    }

    function fromApiToLocalModel(data) {
        data.read_date = data.read_date ? new XDate(data.read_date.replace(" ", "T")) : null;
        data.added_date = data.added_date ? new XDate(data.added_date.replace(" ", "T")) : null;
        data.modified_date = data.modified_date ? new XDate(data.modified_date.replace(" ", "T")) : null;

    }

    function failRequest() {
        alert("error");
    }
})();