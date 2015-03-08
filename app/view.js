(function () {
    define(["mustache", "jquery"], function (Mustache, $) {

        var $headerArea = $("#main-navigation");
        var $contantArea = $("#app-contentarea");
        var templates = {};


        fetchTemplate("book-list");
        fetchTemplate("read-book-list");
        fetchTemplate("book-modify");
        fetchTemplate("author-dialog");

        function fetchTemplate(templateName) {
            $.ajax("app/view/" + templateName + ".mustache", {
                dataType: "text",
                async: false,

                success: function (data) {
                    Mustache.parse(data);
                    templates[templateName] = data;
                },

                error: function () {
                    alert("Fatal Error: Could not fetch " + templateName);
                }
            });
        }

        function render(templateName, model) {
            $contantArea.children().detach();
            closeDialog();
            $contantArea.append(renderOutsideDom(templateName, model));
            window.scrollTo(0, 0);
        }

        function renderOutsideDom(templateName, model) {
            if(!model) {
                model = {};
            }
            if(!templates[templateName]) {
                fetchTemplate(templateName);
            }
            return $(Mustache.render(templates[templateName], model));

        }

        function renderDialog(templateName, model) {
            $contantArea.children().hide();
            var $dialog = renderOutsideDom(templateName, model);
            $dialog.find("#dialog-close-button").on("click", closeDialog);
            $dialog.addClass("is-dialog");
            $contantArea.append($dialog);
            $headerArea.addClass("is-blurry");
            $headerArea.on("click", blockInteractionHandler);

            window.scrollTo(0, 0);
        }

        function closeDialog() {
            $contantArea.find(".is-dialog").remove();
            $headerArea.removeClass("is-blurry");
            $headerArea.unbind("click", blockInteractionHandler);

            $contantArea.children().show();
        }


        return { show: render, showAsDialog: renderDialog, closeDialog: closeDialog }

    });

    function blockInteractionHandler(event) {
        event.preventDefault();
    }
})();