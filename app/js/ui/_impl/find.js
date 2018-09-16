/**
 * Created by matthias.huttar on 28/03/16.
 */

var newUiElement = require("./uiElementFactory");

module.exports = function (rootElement) {
    return {
        byId: function (id) {
            var matches = rootElement.querySelectorAll("#"+id);
            if(matches.length === 0) {
                throw "Could not find element with ID "+id;
            } else if(matches.length > 1) {
                throw "There are several elements with ID "+id;
            }
            return newUiElement(matches[0]);
        },
        body: function () {
            return newUiElement(rootElement.body);
        },
        all: function (selector) {
            // convert to normal array
            var elementList = [].slice.call(rootElement.querySelectorAll(selector));
            return elementList.map(newUiElement);
        }
    }
};