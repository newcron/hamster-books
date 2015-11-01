(function () {


    define(["dispatcher", "loadingDialog"], function (dispatcher, loadingDialog) {
        loadingDialog.show();
        dispatcher.start();
    });
})();
