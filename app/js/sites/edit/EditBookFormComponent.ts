import XDate from "xdate";
import {Author, Book} from "../../data/Book";
import {DateFormFormatter} from "../../ui/DateFormFormatter";
import {UiToolkit} from "../../ui/UiToolkit";
import {EditBookForm} from "./EditBookForm";
import {FormDataExtractor} from "./FormDataExtractor";
import {PickAuthorComponent} from "./author/PickAuthorComponent";
import {AjaxService} from "../../net/AjaxRequest";
import {FormDataValidator} from "./FormDataValidator";

var urls = require("../../net/urls");


export class EditBookFormComponent {

    private pickAuthorComponent: PickAuthorComponent;

    constructor(private form: EditBookForm, private allAuthors: Author[], private bookToEdit: Book,) {
    }

    showForm() {
        this.form.isReadCheckbox().on("change").fire(this.toggleReadNotesSection).andEvaluateNow()
        this.form.getForm().on("submit").fireAndConsume(this.submitFormData);
        this.pickAuthorComponent = new PickAuthorComponent(this.bookToEdit.authors, this.allAuthors);
        this.pickAuthorComponent.insertInto(this.form.pickAuthorTarget());
    }

    private toggleReadNotesSection = () => {
        const readIsChecked = this.form.isReadCheckbox().checked().get()
        if (readIsChecked && this.form.startedReadingField().value().isEmpty()) {
            this.form.startedReadingField().value().set(new DateFormFormatter().format(new XDate()))
        }
        this.form.allReadContextElements().forEach(new UiToolkit().batch().class("hidden").set(!readIsChecked))
    }


    private submitFormData = () => {

        if (new FormDataValidator(this.form, this.pickAuthorComponent, this.bookToEdit).validate()) {
            const data = new FormDataExtractor(this.form, this.pickAuthorComponent, this.bookToEdit).extract();

            new AjaxService().post(urls.addEditBook(), data).then(() => location.hash = "#/read");
        }

    }

    private removeAutocompleteSection() {
        this.form.authorAutocompleteSection().children().forEach(x => x.remove());
    }
}
