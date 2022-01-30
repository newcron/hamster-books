import {EditBookForm} from "./EditBookForm";
import {PickAuthorComponent} from "./PickAuthorComponent";
import {Book} from "../../data/Book";
import {UiElement} from "../../ui/_impl/UiElement";
import XDate from "xdate";

export class FormDataValidator {

    constructor(private form: EditBookForm, private pickAuthorComponent: PickAuthorComponent, private bookToEdit: Book) {

    }

    private valid: boolean = true;

    public validate(): boolean {


        if (this.form.titleField().value().isEmpty()) {
            this.reject(this.form.titleField())
        } else {
            this.accept(this.form.titleField())
        }

        if (this.pickAuthorComponent.isDirty() || this.pickAuthorComponent.getSelectedAuthors().length === 0) {
            this.valid = false;
            this.pickAuthorComponent.markValidationError();
        } else {
            this.pickAuthorComponent.removeValidationErrorMark();
        }

        if (this.form.pageCountField().value().isPresent() && parseInt(this.form.pageCountField().value().get()) <= 0) {
            this.reject(this.form.pageCountField());
        } else {
            this.accept(this.form.pageCountField());
        }

        if (this.form.startedReadingField().value().isPresent() && this.form.finishedReadingField().value().isPresent() && this.form) {
            const startDate = new XDate(this.form.startedReadingField().value().get());
            const endDate = new XDate(this.form.finishedReadingField().value().get());
            const diff = startDate.diffDays(endDate)
            if (diff < 0) {
                this.reject(this.form.startedReadingField());
                this.reject(this.form.finishedReadingField());
            } else {
                this.accept(this.form.startedReadingField());
                this.accept(this.form.finishedReadingField());
            }
        } else {
            this.accept(this.form.startedReadingField());
            this.accept(this.form.finishedReadingField());
        }


        return this.valid;
    }

    private reject(uiElement: UiElement) {
        uiElement.class("is-validation-error").add();
        this.valid = false;
    }

    private accept(uiElement: UiElement) {
        uiElement.class("is-validation-error").remove();
    }
}
