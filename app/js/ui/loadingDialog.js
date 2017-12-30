var view = require("./view");


module.exports = {
    show: function () {
        view.showAsDialog("loading-dialog", {title: "Laden"});
    }
};

