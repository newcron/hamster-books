var XDate = require("xdate");
var view = require("../../ui/view");
var pickAuthor = require("./pickAuthorDialog");
var searchBookController = require("./searchBookController");
var DateFormFormatter = require('../../ui/DateFormFormatter');
var EditBookForm = require('./EditBookForm');
var ui = require('../../ui/ui');
var formSerialize = require('form-serialize');

const DATE_FORMATTER = new DateFormFormatter();
var editBookForm = null;



module.exports = {
    showForm: renderForm
};

function buildViewModel(model) {
    // no model or create book

    if(!model) {
        throw "Need to pass a model to this method";
    }
    var viewModel = Object.assign({}, model);
    if (model.id) {
        viewModel.edit = true;
        viewModel.book_read = viewModel.read_state == "READ";
    }

    return viewModel;
}


function onBookSearchResponse(response) {
    var bookSuggestion = response;

    pickAuthor.show(onAuthorPicked, bookSuggestion["ItemAttributes"]["Author"]);

    editBookForm.apply(function(form){
        form.titleField().value().set(bookSuggestion["ItemAttributes"]["Title"]);
        form.isbnField().value().set(bookSuggestion["ItemAttributes"]["ISBN"]);
        form.pageCountField().value().set(bookSuggestion["ItemAttributes"]["NumberOfPages"]);
        form.publicationYearField().value().set(bookSuggestion["ItemAttributes"]["PublicationDate"].substring(0, 4));
        form.publisherField().value().set(bookSuggestion["ItemAttributes"]["Publisher"]);
    });
}

function renderForm(model, saveCallback) {


    console.log(model);
    view.show("book-modify", buildViewModel(model));
    editBookForm = new EditBookForm(ui.find().byId("modify-form"));
    initReadStateHandling(model.read_state === "READ" ? model.read_date_end : new XDate());

    editBookForm.pickAuthorButton().on("click").fireAndConsume(function(){
        pickAuthor.show(onAuthorPicked, null);
    });


    if (model.read_date_start) {
        editBookForm.startedReadingField().value().set(DATE_FORMATTER.format(model.read_date_start))
    }

    if(model.read_date_end) {
        editBookForm.finishedReadingField().value().set(DATE_FORMATTER.format(model.read_date_end))
    }


    editBookForm.isbnSearchButton().on("click").fireAndConsume(function(){
        var isbn = editBookForm.isbnField().value().get();
        searchBookController.bookDataByIsbn(isbn, onBookSearchResponse);
    });


    editBookForm.getForm().on("submit").fireAndConsume(function() {

        var joinedTags = editBookForm.allTagCheckboxElements()
            .filter(element => element.checked().get())
            .map(element=>element.attr("name").get())
            .join(",");
        editBookForm.tagListField().value().set(joinedTags);


        saveCallback(formSerialize(editBookForm.getForm()._node, {hash: true}));
    });



}

function onAuthorPicked(authorId, authorName) {
    editBookForm.apply(function(form){
        form.authorNameLabel().text().set(authorName);
        form.authorIdField().value().set(authorId);
    });
}

function initReadStateHandling(initialReadDate) {


    editBookForm.isReadCheckbox().on("change").fire(updateState);


    updateState();

    function updateState() {
        var state = editBookForm.isReadCheckbox().checked().get();



        if (state) {
            editBookForm.apply(function(form){
                form.allReadContextElements().forEach(ui.batch().class("hidden").remove());
                form.readStateField().value().set("READ");
                if(!form.startedReadingField().value().get()) {
                    form.startedReadingField().value().set(initialReadDate ? DATE_FORMATTER.format(initialReadDate) : null);
                }
            });
        } else {
            editBookForm.apply(function(form){
                form.allReadContextElements().forEach(ui.batch().class("hidden").add());
                form.readStateField().value().set("UNREAD");
            });
        }
    }
}
