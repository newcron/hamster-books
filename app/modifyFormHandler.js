(function () {
    define(["jquery", "xdate", "view", "pickAuthorDialog", "searchBookController"], function ($, XDate, view, pickAuthor, searchBookController) {

        var $form;

        function convertFormToJson() {
            var contents = {};
            $.each($form.serializeArray(), function () {
                contents[this.name] = this.value === "" ? null : this.value;
            });
            return contents;
        }

        return {
            showForm: renderForm
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


        function onBookSearchResponse(response) {
            var bookSuggestion = response;

            pickAuthor.show(onAuthorPicked, bookSuggestion["ItemAttributes"]["Author"]);

            $form.find("#modify-title").val(bookSuggestion["ItemAttributes"]["Title"]);
            $form.find("#modify-page-count").val(bookSuggestion["ItemAttributes"]["NumberOfPages"]);
            $form.find("#modify-publication-year").val(bookSuggestion["ItemAttributes"]["PublicationDate"].substring(0,4));
            $form.find("#modify-publisher").val(bookSuggestion["ItemAttributes"]["Publisher"]);
        }

        function renderForm(model, saveCallback) {

            view.show("book-modify", buildViewModel(model));
            $form = $("#modify-form");
            initReadStateHandling(model.read_state === "READ" ? model.read_date_end : new XDate());
            $form.find("#modify-author-selector").on("click", function(){
                pickAuthor.show(onAuthorPicked, null);
            });

            if(model.read_date_start) {
                var startDate = new XDate(model.read_date_start);
                $("#modify-read-date-start").val(startDate.toString("yyyy-MM-dd"));
            }

            $form.find("#action-search-isbn").on("click", function(){
                var isbn = $form.find("#modify-isbn").val().replace(/[^0-9A-Za-z]/g, "");
                searchBookController.bookDataByIsbn(isbn, onBookSearchResponse);
            });

            $form.submit(function (ev) {
                ev.preventDefault();
                saveCallback(convertFormToJson());
            });

        }

        function onAuthorPicked(authorId, authorName){
            $("#modify-author-name").text(authorName);
            $("#modify-author-id").val(authorId);
        }

        function initReadStateHandling(initialReadDate) {
            var $checkbox = $("#modify-is-read");
            console.log("read state handling", initialReadDate);


            $checkbox.on("change", updateState);
            updateState();

            function updateState() {
                var state = $checkbox.is(":checked");
                var $contexts = $(".is-read-context");
                if (state) {
                    $contexts.removeClass("hidden");
                    if (!$("#modify-read-date-end").val()) {
                        $("#modify-read-date-end").val(initialReadDate ? initialReadDate.toString("yyyy-MM-dd") : null);
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