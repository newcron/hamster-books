(function () {
    define(["jquery", "xdate", "view", "pickAuthorDialog"], function ($, XDate, view, pickAuthor) {

        var $form;

        function convertFormToJson() {
            var contents = {};
            $.each($form.serializeArray(), function () {
                contents[this.name] = this.value === "" ? null : this.value;
            });
            return contents;
        }


        return {
            showForm: function (model, saveCallback) {

                view.show("book-modify", buildViewModel(model));
                $form = $("#modify-form");
                initReadStateHandling();
                pickAuthor.init();
                $form.submit(function (ev) {
                    ev.preventDefault();
                    saveCallback(convertFormToJson());
                });

            }
        };


        function buildViewModel(model) {
            // no model or create book
            if (!model || !model.id) {
                return {}
            }

            viewModel = $.extend({}, model);
            viewModel.edit = true;
            viewModel.book_read = viewModel.read_state == "READ";
            return viewModel;
        }


        function initReadStateHandling() {
            var $checkbox = $("#modify-is-read");

            $checkbox.on("change", updateState);
            updateState()

            function updateState() {
                var state = $checkbox.is(":checked");
                var $contexts = $(".is-read-context");
                if (state) {
                    $contexts.removeClass("hidden");
                    if (!$("#modify-read-date").val()) {
                        $("#modify-read-date").val(new XDate().toString("yyyy-MM-dd"));
                    }
                    $("#modify-read-state").val("READ");
                } else {
                    $contexts.addClass("hidden");
                    $("#modify-read-state").val("UNREAD");
                }
            }
        }

    });

})();