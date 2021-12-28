var view = require("./view");


module.exports = {
    show: function () {
        view.showAsDialog(require("../../view/loading-dialog.mustache"), {title: "Laden"});
    }
};

