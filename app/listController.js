(function(){
    define(["view", "bookService"], function(view, bookService){

        return {
            readBooksController: function(){
                bookService.listBooksInState("READ", function(data){
                    view.show("book-list", {state: "Gelesene", books: data});
                });
            },

            unreadBooksController: function() {
                bookService.listBooksInState("UNREAD", function(data){
                    view.show("book-list", {state: "Ungelesene", books: data});

                });

            }
        }

    });

})();