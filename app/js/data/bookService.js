var urls = require("../net/urls");
var ajax = require("../net/ajax");
var loadingDialog = require("../ui/loadingDialog");
var XDate = require("xdate");


module.exports = {
    listBooksInState: function (state, callback) {
        loadingDialog.show();
        ajax.get(urls.getBooksByState(state)).then(convertList(callback));

    },

    getBook: function (id, callback) {
        ajax.get(urls.getBook(id)).then(convertSingle(callback));
    },

    create: function (book, callback) {
        ajax.post(urls.createBook()).data(book).then(callback);
    },

    update: function (book, callback) {
        ajax.post(urls.updateBook(book.id)).data(book).then(callback);
    }
};


function convertList(callback) {
    return function (data) {
        var map = data.map(fromApiToLocalModel);
        callback(map);
    }
}

function convertSingle(callback) {
    return function (data) {
        fromApiToLocalModel(data);
        callback(data);
    }
}

function fromApiToLocalModel(data) {
    data.read_date_end = data.read_date_end ? new XDate(data.read_date_end.replace(" ", "T")) : null;
    data.added_date = data.added_date ? new XDate(data.added_date.replace(" ", "T")) : null;
    data.modified_date = data.modified_date ? new XDate(data.modified_date.replace(" ", "T")) : null;

    return data;
}