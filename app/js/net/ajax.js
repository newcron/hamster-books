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

            var r = new XMLHttpRequest();
            r.open(method, url, true);
            r.onreadystatechange = function () {
                if (r.readyState != 4) return;

                var responseData = getResponseData(r);

                if(responseData.isSuccess()) {
                    callback(responseData.getParsedPayload());
                } else {
                    errorHandler(url, responseData);
                }
            };

            var form = null;
            if(data !== null) {
                form = new FormData();
                for(let field in data) {
                    if(!data.hasOwnProperty(field) || data[field] === null) {
                        continue;
                    }
                    form.append(field, data[field]);
                }
            }
            r.send(form);
        }
    }
}

function errorHandler(url, response) {
    if(response.isUnauthorized()) {
        var loginUrl = response.getParsedPayload().login;
        if (loginUrl) {
            window.location = loginUrl;
        }
    } else {
        alert("Error: "+response.getRawPayload());
    }

}

function getResponseData(request) {

    return {
        isSuccess: function() {
            return request.status >= 200 && request.status < 300;
        },


        isUnauthorized: function() {
            return request.status === 401;
        },

        getParsedPayload: function() {
            if(request.getResponseHeader("Content-Type").startsWith("application/json")) {
                return JSON.parse(request.responseText);
            }
            return request.responseText;
        },

        getRawPayload: function() {
            return request.responseText;
        }


    };
};

module.exports = {
    "post": function (url) {
        return dataObjectFactory("POST", url);
    },
    "get": function (url) {
        return thenObjectFactory("GET", url, null);
    }
};
