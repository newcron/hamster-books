const { UiElement } = require('./UiElement');


function createElement(htmlStructure) {
    var dummyElement = document.createElement("div");
    dummyElement.innerHTML = htmlStructure;

    var element = new UiElement(dummyElement.firstChild);

    element.appendTo = function(newTarget) {
        console.log(newTarget.element);
        console.log(element);

        newTarget.element.appendChild(element.element);
    };

    return element;
}

module.exports = createElement;