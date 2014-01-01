(function(){
    define(["jquery", "urls"], function($, urls){

        return {
            listAuthors: function(callback) {
                $.ajax(urls.getAuthors(), {
                    success: function(data){
                        var converted = [];
                        $.each(data, function(){
                            var name = this.last_name+", "+this.first_name+" "+this.middle_name;
                            converted.push({id: this.id, name: name});
                        });
                        callback(converted);
                    },
                    error: function(){alert("error")}
                });
            }
        }

    });

})();