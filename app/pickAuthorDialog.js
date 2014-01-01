(function () {
    define(["jquery", "authorService"], function ($, authorService) {
        return {
            init: function () {

                var $list = $("#modify-author-dialog-list");
                $("#modify-author-selector").on("click", pickAuthor);
                var $filterField = $("#modify-author-dialog-filter");
                $filterField.on("input", filterSelectList);
                $list.on("click", pickElement);

                var knownAuthors;

                function pickAuthor() {
                    authorService.listAuthors(function (authors) {
                        knownAuthors = authors;
                        filterSelectList()
                    });
                }

                function filterSelectList() {
                    var search = $filterField.val().toLocaleLowerCase();
                    if(search.length < 2 ) {
                        fillList([]);
                        return;
                    }
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

        };
    });

})();