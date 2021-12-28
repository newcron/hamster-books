
var ui = require("./ui");
var mainMenu = require('./components/mainmenu/mainMenu').menu;

var contentArea = ui.find().byId("app-contentarea");

var closeDialogCallback = null;



function render(templateName, model) {

    contentArea.children().forEach(ui.batch().remove());
    closeDialog();
    renderOutsideDom(templateName, model).appendTo(contentArea);
    window.scrollTo(0, 0);
}

function renderOutsideDom(template, model) {
    
    if (!model) {
        model = {};
    }
    
        var renderedHtml = template(model);
    return ui.createElement(renderedHtml);


}

function showAsDialog(template, model, closeCallback) {
    contentArea.find().all(".is-dialog").forEach(ui.batch().remove());
    contentArea.children().forEach(ui.batch().class("is-hidden").add());
    var dialogContents = renderOutsideDom(template, model);
    dialogContents.find().all("#dialog-close-button").forEach(function(x){x.on("click").fireAndConsume(closeDialog)});
    dialogContents.class("is-dialog").add();
    dialogContents.appendTo(contentArea);

    mainMenu.enterDialogMode();

    closeDialogCallback = closeCallback;
    window.scrollTo(0, 0);
}

function closeDialog() {
    contentArea.find().all(".is-dialog").forEach(ui.batch().remove());
    mainMenu.leaveDialogMode();

    if (closeDialogCallback) {
        closeDialogCallback();
        closeDialogCallback = null;
    }
    contentArea.children().forEach(ui.batch().class("is-hidden").remove());
}


module.exports = {show: render, showAsDialog: showAsDialog, closeDialog: closeDialog};
