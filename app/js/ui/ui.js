var createElement = require("./_impl/createElement.js");
var find = require("./_impl/find");
var uiElementFactory = require('./_impl/uiElementFactory');


module.exports = {
    find: function () {
        return find(document);
    },
    afterInit: function (callback) {
        if (document.readyState !== "loading") {
            callback();
        } else {
            document.addEventListener("DOMContentLoaded", callback);
        }
    },

    "from": function(element) {
        return uiElementFactory(element);
    },

    createElement: createElement,

    batch: function () {
        return {
            remove: function () {
                return function (element) {
                    element.remove();
                }
            },

            'class': function (className) {
                return {
                    remove: function () {
                        return function (element) {
                            element.class(className).remove();

                        };
                    },
                    add: function () {
                        return function (element) {
                            element.class(className).add();
                        };
                    }
                }
            }
        }
    }
};