(function () {
    define(["jQuery"], function ($) {
        return {
            "post": function(url) {
                return dataObjectFactory("POST", url);
            },
            "get": function(url) {
                return thenObjectFactory("GET", url, null);
            }
        };


        function errorHandler(url, data) {
            return function () {
                alert("Error "+url+" "+data);
            }
        }

        function dataObjectFactory(method, url) {
            return {
                data: function (data) {
                    return thenObjectFactory(method, url, data);
                }
            }
        }

        function thenObjectFactory(method, url, data) {
            return {
                then: function (callback) {
                    var options = {
                        method: method,
                        success: callback,
                        error: errorHandler(url, data)
                    };

                    if(data!==null) {
                        options.data = data;
                    }

                    $.ajax(url, options);
                }
            }
        }
    });

})();

