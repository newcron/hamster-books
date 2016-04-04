var ajax = require('../../net/ajax');

var urls = require("../../net/urls");

module.exports = {
    bookDataByIsbn: function (isbn, result) {
        ajax.get(urls.retrieveBookInfo(isbn)).then(result);
        /*         $.ajax(urls.retrieveBookInfo(isbn), {
         success: result
         }); */
    }
};