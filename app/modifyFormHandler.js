(function () {
    define(["jquery", "authorService", "xdate", "view"], function ($, authorService, XDate, view) {

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
                initAuthorSelection();
                $form.submit(function (ev) {
                    ev.preventDefault();
                    saveCallback(convertFormToJson());
                });

            }
        };


    });

    function buildViewModel(model) {
        // no model or create book
        if (!model || !model.id) {
            return {}
        }
        ;

        viewModel = $.extend({}, model);
        viewModel.edit = true;
        viewModel["book-read"] = viewModel.read_state == "READ";
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
                if(!$("#modify-read-date").val()) {
                    $("#modify-read-date").val(new XDate().toString("yyyy-MM-dd"));
                }
                $("#modify-read-state").val("READ");
            } else {
                $contexts.addClass("hidden");
                $("#modify-read-state").val("UNREAD");
            }
        }
    }

    function initAuthorSelection() {
        var $list = $("#modify-author-dialog-list");
        $("#modify-author-selector").on("click", pickAuthor);
        $("#modify-author-dialog-filter").on("input", filterSelectList);
        $list.on("click", pickElement);

        var knownAuthors;

        function pickAuthor() {
            authorService.listAuthors(function (authors) {
                knownAuthors = authors;
                fillList(authors);
            });
        }

        function filterSelectList() {
            var search = $(this).val().toLocaleLowerCase();
            var result = [];
            $.each(knownAuthors, function () {
                var match = this.name.toLocaleLowerCase().indexOf(search) > -1;
                if (match) {
                    result.push(this);
                }
            })
            fillList(result);
        }

        function fillList(authors) {
            $list.children().remove();

            $.each(authors, function () {
                var $listItem = $("<a class='list-group-item' href='" + this.id + "' >" + this.name + "</option>");
                $listItem.data("author", this);
                $listItem.appendTo($list);
            });
        }

        function pickElement(ev) {
            ev.preventDefault();
            var $target = $(ev.target);
            if ($target.is("a")) {
                $("#modify-author-dialog").modal("hide");
                var author = $target.data("author");
                $("#modify-author-id").val(author.id);
                $("#modify-author-name").text(author.name);
            }
        }

    }


})();