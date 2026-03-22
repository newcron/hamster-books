const { UiElement } = require('./UiElement');


function createElement(htmlStructure) {
    var dummyElement = document.createElement("div");
    dummyElement.innerHTML = htmlStructure;

    var element = new UiElement(dummyElement.firstChild);

    element.appendTo = function(newTarget) {

        newTarget.element.appendChild(element.element);
    };

    return element;
}

module.exports = createElement;