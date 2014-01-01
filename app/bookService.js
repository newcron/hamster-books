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
                var convertedBook = {};

                $.each(book, function (key, val) {
                    var keyC = key.replace("-", "_");
                    convertedBook[keyC] = val;
                });

                $.ajax(urls.createBook(), {
                    method: "POST",
                    data: convertedBook,
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
        data.read_date = data.read_date.substr(0,10);
        $.each(data, function (key, value) {
            data[key.replace("_", "-")] = value;
        });


    }

    function failRequest() {
        alert("error");
    }
})();