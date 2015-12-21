(function () {
    define(["jquery", "Templates"], function ($, templates) {

        var $headerArea = $("#main-navigation");
        var $contantArea = $("#app-contentarea");

        closeDialogCallback = null;



        function render(templateName, model) {
            $contantArea.children().detach();
            closeDialog();
            $contantArea.append(renderOutsideDom(templateName, model));
            window.scrollTo(0, 0);
        }

        function renderOutsideDom(templateName, model) {
            templateName = "app/view/"+templateName+".mustache";
            if(!model) {
                model = {};
            }
            if(!templates[templateName]) {
                throw "template does not exist"
            }
            var render2 = templates[templateName].render(model);
            return $(render2);

        }

        function renderDialog(templateName, model, closeCallback) {
            $contantArea.children().hide();
            console.log(model);
            var $dialog = renderOutsideDom(templateName, model);
            $dialog.find("#dialog-close-button").on("click", closeDialog);
            $dialog.addClass("is-dialog");
            $contantArea.append($dialog);
            $headerArea.addClass("is-blurry");
            $headerArea.on("click", blockInteractionHandler);
            closeDialogCallback = closeCallback;
            window.scrollTo(0, 0);
        }

        function closeDialog() {
            $contantArea.find(".is-dialog").remove();
            $headerArea.removeClass("is-blurry");
            $headerArea.unbind("click", blockInteractionHandler);

            if(closeDialogCallback) {
                closeDialogCallback();
                closeDialogCallback = null;
            }
            $contantArea.children().show();
        }


        return { show: render, showAsDialog: renderDialog, closeDialog: closeDialog }

    });

    function blockInteractionHandler(event) {
        event.preventDefault();
    }
})();