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
    addEditBook: function () {
        return "api/book"
    },

    createAuthor: function () {
        return "api/author";
    }

};
