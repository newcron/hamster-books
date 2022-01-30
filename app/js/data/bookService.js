var urls = require("../net/urls");
var ajax = require("../net/ajax");
var loadingDialog = require("../ui/loadingDialog");
var XDate = require("xdate");
const {Book} = require("./Book");


module.exports = {
    listBooksInState: function (state, callback) {
        loadingDialog.show();
        ajax.get(urls.getBooksByState(state)).then(convertList(callback));

    },

    getBook: function (id, callback) {
        ajax.get(urls.getBook(id)).then(convertSingle(callback));
    },

    create: function (book, callback) {
        ajax.post(urls.addEditBook()).data(book).then(callback);
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

    data.bookObject = new Book(data);
    data.read_date_end = parseDate(data.read_date_end);
    data.read_date_start = parseDate(data.read_date_start)
    data.added_date = parseDate(data.added_date);
    data.modified_date = parseDate(data.modified_date);

    function parseDate(d) {
        return d ? new XDate(d.replace(" ", "T")) : null;
    }


    return data;
}
