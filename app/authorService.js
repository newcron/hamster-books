(function(){
    define(["jquery", "urls"], function($, urls){


        return {
            listAuthors: function(callback) {
                $.ajax(urls.getAuthors(), {
                    success: function(data){
                        var converted = [];
                        $.each(data, function(){
                            var name = authorName(this);
                            converted.push({id: this.id, name: name});
                        });
                        callback(converted);
                    },
                    error: function(){alert("error")}
                });
            },

            createAuthor: function(author, callback) {
                $.ajax(urls.createAuthor(), {
                    method: "POST",
                    data: author,
                    success:function(data){
                        callback({id: data.id, name: authorName(data)});
                    },
                    error: function(){alert("error")}
                })
            }
        }

    });


    function authorName(author) {
        return (author.last_name + ", " + author.first_name + " " + (author.middle_name != null ? author.middle_name : "") ).trim();
    }

})();