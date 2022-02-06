import {UiToolkit} from "../../ui/UiToolkit";
import {UiElement} from "../../ui/_impl/UiElement";

var DateFormFormatter = require('../../ui/DateFormFormatter');

export class EditBookForm {

    private element: UiElement;

    constructor() {
        this.element = new UiToolkit().find().byId("modify-form");
    }

    apply(action: (i: EditBookForm) => void) {
        action(this);
    }

    getForm() {
        return this.element;
    }

    pickAuthorTarget() {
        return this.element.find().byId("pick-author-component-target")
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

    commentField() {
        return this.findField("modify-read-comment");
    }

    ratingField() {
        return this.findField("modify-read-rating");
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

    readStateRadios() {
        return this.element.find().all(".read-state-selector")
    }

    cancelledCheckbox() {
        return this.element.find().byId("cancelled");
    }

    cancelledContextField() {
        return this.element.find().all(".cancelled-context");
    }

    cancelledOnPageField() {
        return this.element.find().byId("cancelled-on-page");
    }

    selectedReadStateRadio() {
        return this.element.find().all(".read-state-selector:checked")[0];
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


    findField(element: string) {
        return this.element.find().byId(element);
    }

    addAuthorField() {
        return this.element.find().byId("add-author-name");
    }


    authorAutocompleteSection() {
        return this.element.find().byId("existing-author-autocomplete");
    }


}
