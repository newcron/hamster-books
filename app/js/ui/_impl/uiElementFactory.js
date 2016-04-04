
function newUiElement(element) {
    if (element === null || element === undefined) {
        throw "element " + id + " can not be found";
    }

    var instance = {
        '_node': element,

        parent: function() {
            return newUiElement(element.parentElement);
        },

        find: function() {
            return require("./find")(element);
        },

        getDrawingContext: function() {
            return element.getContext("2d");
        },

        children: function() {
            return [].slice.call(element.children).map(newUiElement);
        },

        forEach: function(callback) {
            callback.apply(instance, [instance, 0, [instance]]);
        },

        attr: function(attributeName) {
            return {
                "get": function(){
                    return element.getAttribute(attributeName);
                },
                'set': function(value) {
                    element.setAttribute(attributeName, value);
                }
            }

        },

        'class': function(className) {
            var classList = element.classList;

            return {
                add: function() {
                    if (!classList.contains(className)) {
                        classList.add(className);
                    }
                    return instance;
                },
                remove: function() {
                    if (classList.contains(className)) {
                        classList.remove(className);
                    }
                    return instance;
                },
                toggle: function() {
                    if(classList.contains(className)) {
                        classList.remove(className);
                    } else {
                        classList.add(className);
                    }
                    return instance;
                },
                isPresent: function() {
                    return classList.contains(className);
                }
            }
        },

        text: function() {
            return {
                "get": function() {
                    return element.textContent;
                },
                "set": function(value) {
                    element.textContent = value;
                    return instance;
                }
            }
        },

        value: function() {
            return {
                "get": function() {
                    return element.value;
                },
                "set": function(value) {
                    element.value=value;
                    return instance;
                }
            }
        },

        checked: function() {
            return {
                "get": function() {
                    return element.checked;
                },
                "set": function(value) {
                    element.checked=value;
                    return instance;
                }
            }
        },



        'remove' : function() {
            element.parentNode.removeChild(element);
        },

        'on': function (eventName) {
            return {
                fire: function (callback) {
                    element.addEventListener(eventName, callback);
                    return instance;
                },

                fireAndConsume: function(callback) {
                    element.addEventListener(eventName, function(e){
                        e.preventDefault();
                        callback(e);
                    });
                    return instance;
                },

                disarm: function(callback) {
                    element.removeEventListener(eventName, callback);

                },

                matching: function(subSelector) {
                    return {
                        fire: function (callback) {
                            element.addEventListener(eventName, function(e){
                                if([].slice.call(element.querySelectorAll(subSelector)).indexOf(e.target) !== -1) {
                                    callback(e);
                                }
                            });
                            return instance;
                        },
                        fireAndConsume: function(callback) {
                            element.addEventListener(eventName, function(e){
                                if([].slice.call(element.querySelectorAll(subSelector)).indexOf(e.target) !== -1) {
                                    e.preventDefault();
                                    callback(e);
                                }
                            });
                            return instance;
                        }
                    }
                }

            }
        }
    };

    return instance;
}

module.exports = newUiElement;