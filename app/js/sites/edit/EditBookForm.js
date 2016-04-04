var DateFormFormatter = require('../../ui/DateFormFormatter');

class EditBookForm {

    constructor(uiElement) {
        this.element = uiElement;
    }

    apply(action){
        action(this);
    }

    getForm() {
        return this.element;
    }

    authorNameLabel() {
        return this.findField("modify-author-name");
    }

    authorIdField() {
        return this.findField("modify-author-id")
    }

    titleField() {
        return this.findField("modify-title");
    }

    isbnField() {
        return this.findField("modify-isbn");
    }

    isbnSearchButton() {
        return this.findField("action-search-isbn");
    }

    pageCountField() {
        return this.findField("modify-page-count");
    }

    publicationYearField() {
        return this.findField("modify-publication-year");
    }

    publisherField() {
        return this.findField("modify-publisher");
    }

    startedReadingField() {
        return this.findField("modify-read-date-start");
    }

    finishedReadingField() {
        return this.findField("modify-read-date-end");
    }

    isReadCheckbox() {
        return this.findField("modify-is-read");
    }

    readStateField() {
        return this.findField("modify-read-state");
    }

    allReadContextElements() {
        return this.element.find().all(".is-read-context");
    }

    allTagCheckboxElements() {
        return this.element.find().byId("modify-tag-list").find().all("input[type='checkbox']");
    }

    tagListField() {
        return this.element.find().byId("modify-tags");
    }



    pickAuthorButton() {
        return this.findField("modify-author-selector");
    }


    findField(element) {
        return this.element.find().byId(element);
    }


}

module.exports = EditBookForm;