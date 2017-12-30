var uiElementFactory = require('./uiElementFactory');

function createElement(htmlStructure) {
    var dummyElement = document.createElement("div");
    dummyElement.innerHTML = htmlStructure;

    var element = uiElementFactory(dummyElement.firstChild);

    element.appendTo = function(newTarget) {
        newTarget._node.appendChild(element._node);
    };

    return element;
}

module.exports = createElement;