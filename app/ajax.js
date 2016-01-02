(function () {
    define(["jquery"], function ($) {
        return {
            "post": function(url) {
                return dataObjectFactory("POST", url);
            },
            "get": function(url) {
                return thenObjectFactory("GET", url, null);
            }
        };


        function errorHandler(url, data) {
            return function (jqxhr, status, thrownError ) {
                if(thrownError ===  "Unauthorized") {
                    var loginUrl = JSON.parse(jqxhr.responseText).login;
                    if(loginUrl) {
                        window.location=loginUrl;
                    }
                }
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
                    console.log(method, url, data);
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

