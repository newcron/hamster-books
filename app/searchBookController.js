(function(){
    define(["urls", "jquery"], function(urls, $){
        return {
            bookDataByIsbn : function(isbn, result) {
                $.ajax(urls.retrieveBookInfo(isbn), {
                    success: result
                });
            }
        }
    });
})();