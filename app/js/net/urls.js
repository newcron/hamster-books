module.exports = {
    getBooksByState: function (state) {
        return "api/book/all/" + state;
    },
    getBook: function (id) {
        return "api/book/" + id;
    },
    getAuthors: function () {
        return "api/author"
    },
    createBook: function () {
        return "api/book"
    },
    updateBook: function (id) {
        return "api/book/" + id;
    },
    createAuthor: function () {
        return "api/author";
    },
    retrieveBookInfo: function (isbn) {
        return "api/book/search/" + isbn + "?in[]=ASIN&in[]=SmallImage&in[]=MediumImage&in[]=LargeImage&in[]=ItemAttributes";
    }

};
