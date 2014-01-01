(function () {

    define(
        {
            getBooksByState: function (state) {
                return "api/book/all/" + state;
            },
            getBook: function(id) {
                return "api/book/"+id ;
            },
            getAuthors: function() {
                return "api/author"
            },
            createBook: function() {
                return "api/book"
            }

        }
    );

})();