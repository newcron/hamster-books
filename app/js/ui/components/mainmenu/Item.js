var ui = require('../../ui');

class Item {

    constructor(element) {
        this.element = element;
    }

    isActive() {
        return this.element.class("is-selected").isPresent();
    }

    setActive(isActive) {
        if(isActive === true) {
            this.element.class("is-selected").add();
        } else if(isActive === false) {
            this.element.class("is-selected").remove();
        }
        return this;
    };
}



module.exports = Item;