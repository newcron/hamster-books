class Menu {

    constructor(menuElement) {
        this.element = menuElement;
        this.currentState = null;

        this.doNothingEventHandler = e => e.preventDefault()
        ;
    }

    setState(newState) {
        if (this.currentState !== null) {
            this.element.class(this.currentState).remove();
        }
        this.currentState = newState;
        this.element.class(newState).add();
    }


    enterDialogMode() {
        this.element.class("is-blurry").add();
        this.element.on("click").fire(this.doNothingEventHandler);
    }

    leaveDialogMode() {
        this.element.class("is-blurry").remove();
        this.element.on("click").disarm(this.doNothingEventHandler);
    }
}

function x() {

}

module.exports = Menu;