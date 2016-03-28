(function () {
    define(["urls", "ajax"], function (urls, ajax) {


        return {
            listAuthors: function (callback) {
                ajax.get(urls.getAuthors()).then(function (data) {

                    callback(data.map(function(author){
                        return {
                            id: author.id, name: authorName(author)
                        };
                    }));
                });
            },

            createAuthor: function (author, callback) {
                ajax.post(urls.createAuthor()).data(author).then(function (data) {
                    callback({id: data.id, name: authorName(data)});
                });
            }
        }

    });


    function authorName(author) {
        return (author.last_name + ", " + author.first_name + " " + (author.middle_name != null ? author.middle_name : "") ).trim();
    }

})();