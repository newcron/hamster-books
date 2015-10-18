(function () {


    define(["dispatcher", "loadingDialog"], function (dispatcher, loadingDialog) {
        loadingDialog.show();

        // view.showAsDialog("loading-dialog", {title: "Laden"});
        dispatcher.start();
    });
})();
