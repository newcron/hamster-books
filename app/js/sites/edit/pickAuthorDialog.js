var authorService = require("../../data/authorService");
var view = require("../../ui/view");
var ui = require('../../ui/ui');
var AuthorNameAnalyzer = require('./AuthorNameAnalyzer');

module.exports = {
    show: function (selectCallback, suggestion) {
        authorService.listAuthors(function (authors) {
            var authorInfo = new AuthorNameAnalyzer().analyzeCompleteNameFromString(suggestion);
            view.showAsDialog("author-dialog", {authors: authors, newAuthorSuggestion: authorInfo});
            setupDialog(selectCallback, authorInfo);
        });
    }
};


function setupDialog(selectCallback) {
    var filterField = ui.find().byId("modify-author-dialog-filter");
    var resultList = ui.find().byId("modify-author-dialog-existing-list");


    ui.find().byId("author-create-action").on("click").fireAndConsume(createAndPickAuthor);



    ui.find().byId("modify-author-dialog-existing-list").on("click").matching("li").fireAndConsume(pickElement);
    filterField.on("keyup").fire(filterSelectList);
    // for suggestions - filter
    filterSelectList();

    function createAndPickAuthor() {
        var data = {
            first_name: nullToEmpty(ui.find().byId("author-first-name").value().get()),
            middle_name: nullToEmpty(ui.find().byId("author-middle-name").value().get()),
            last_name: nullToEmpty(ui.find().byId("author-last-name").value().get())
        };

        authorService.createAuthor(data, function (author) {
            selectCallback(author.id, author.name);
            view.closeDialog();
        });

        function nullToEmpty(val) {
            return val == null ? "" : val;
        }
    }

    function filterSelectList() {

        var search = filterField.value().get().toLocaleLowerCase();
        if (search.length < 2) {
            resultList.children().forEach(ui.batch().class("is-hidden").remove());
            return;
        }

        resultList.children().forEach(function(element){
            var matchesSearch = element.text().get().toLocaleLowerCase().indexOf(search) !== -1;

            if(matchesSearch) {
                element.class("is-hidden").remove();
            } else {
                element.class("is-hidden").add();
            }

        });
    }


    function pickElement(ev) {
        var targetElement = ui.from(ev.target);
        var id = targetElement.attr("data-author-id").get();
        var name = targetElement.text().get();

        selectCallback(id, name);
        view.closeDialog();
    }
}
