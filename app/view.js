(function () {
    define(["mustache", "jquery"], function (Mustache, $) {


        var $contantArea = $("#app-contentarea");
        var templates = {};


        fetchTemplate("book-list");
        fetchTemplate("book-modify");

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
            if(!model) {
                model = {};
            }
            if(!templates[templateName]) {
                fetchTemplate(templateName);
            }
            var contents = Mustache.render(templates[templateName], model);

            $contantArea.children().detach();
            $contantArea.append($(contents));
        }


        return { show: render }

    });
})();