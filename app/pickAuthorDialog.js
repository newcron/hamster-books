(function () {
    define(["jquery", "authorService", "view"], function ($, authorService, view) {

        return {
            show: function (selectCallback, suggestion) {
                authorService.listAuthors(function (authors) {
                    var authorInfo = extractAuthorInfo(suggestion);
                    view.showAsDialog("author-dialog", {authors: authors, newAuthorSuggestion: authorInfo});
                    setupDialog(selectCallback, authorInfo);
                });
            }
        };

        function extractAuthorInfo(authorString) {
            if(!authorString) {
                return null;
            }
            var authorExploded = authorString.split(" ");
            var author = {first_name: "", last_name: "", middle_name: ""};
            if(authorExploded.length == 1) {
                author.last_name = authorExploded[0];
            } else if(authorExploded.length == 2) {
                author.last_name = authorExploded[1];
                author.first_name = authorExploded[0];
            } else {
                author.first_name = authorExploded[0];
                author.last_name = authorExploded[authorExploded.length-1];
                author.middle_name = authorExploded.splice(0,1).splice(-1,1).join(" ");
            }

            return author;
        }

        function setupDialog(selectCallback) {
            var $list = $("#modify-author-dialog-existing-list");
            var $filterField = $("#modify-author-dialog-filter");
            $("#author-create-action").on("click", createAndPickAuthor);
            $filterField.on("keyup", filterSelectList);
            $list.on("click", "li", pickElement);

            // for suggestions - filter
            filterSelectList();

            function createAndPickAuthor() {
                var data = {
                    first_name: nullToEmpty($("#author-first-name").val()),
                    middle_name: nullToEmpty($("#author-middle-name").val()),
                    last_name: nullToEmpty($("#author-last-name").val())
                }

                authorService.createAuthor(data, function(author){
                    selectCallback(author.id, author.name);
                        view.closeDialog();
                });

                function nullToEmpty(val) {
                    return val == null ? "" : val;
                }
            }

            function filterSelectList() {

                var search = $filterField.val().toLocaleLowerCase();
                if(search.length < 2 ) {
                    $list.children().show();
                    return;
                }
                $list.children().each(function(){
                    var $currentEl = $(this);
                    var match = $currentEl.text().toLocaleLowerCase().indexOf(search) > -1;
                    if(!match) {
                        $currentEl.hide();
                    } else {
                        $currentEl.show();
                    }
                });
            }


            function pickElement(ev) {
                ev.preventDefault();
                var $target = $(ev.target);
                var id = $target.attr("data-author-id")
                var name = $target.text();

                selectCallback(id, name);
                view.closeDialog();
            }
        }

    });




})();