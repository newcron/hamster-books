var templates = require("Templates");
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

function renderOutsideDom(templateName, model) {
    templateName = "app/view/" + templateName + ".mustache";
    if (!model) {
        model = {};
    }
    if (!templates[templateName]) {
        throw "template does not exist"
    }
    var renderedHtml = templates[templateName].render(model);
    return ui.createElement(renderedHtml);


}

function renderDialog(templateName, model, closeCallback) {
    contentArea.children().forEach(ui.batch().class("is-hidden").add());
    var dialogContents = renderOutsideDom(templateName, model);
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


module.exports = {show: render, showAsDialog: renderDialog, closeDialog: closeDialog};
