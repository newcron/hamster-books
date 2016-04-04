var dispatcher = require("./dispatcher");
var loadingDialog = require("./ui/loadingDialog");

loadingDialog.show();
dispatcher.start();
