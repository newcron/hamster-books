import {Author} from "../../../data/Book";
import {UiToolkit} from "../../../ui/UiToolkit";
import {UiElement} from "../../../ui/_impl/UiElement";
import {AuthorSuggester} from "./AuthorSuggester";
import {AuthorReferenceParser} from "./AuthorReferenceParser";

export class PickAuthorComponent {
    private attachedTo: UiElement;
    private authorSuggester: AuthorSuggester;
    private autocompleteSection: UiElement;
    private authorNameInput: UiElement;

    constructor(private selectedAuthors: Author[], private allAuthors: Author[]) {
        this.authorSuggester = new AuthorSuggester(allAuthors);
    }

    public insertInto(target: UiElement) {
        this.attachedTo = target;
        let element = this.regenerateAndAttachHtml(target);
        element.on("click").matching(".delete-author-button").fireAndConsume(this.onDeleteAuthorEvent);

        this.authorNameInput = element.find().byId("add-author-name");
        this.authorNameInput.on("keyup").fire(this.onAddAuthorKeyUp)
        this.authorNameInput.on("keydown").fire(this.onAddAuthorKeyDown)
    }

    public getSelectedAuthors() {
        return this.selectedAuthors;
    }


    private regenerateAndAttachHtml(target: UiElement) {
        const html = require("../../../../view/pick-author-component.mustache")(
            {
                authors: this.selectedAuthors.map(x => ({
                    id: x.id,
                    transient: x.isTransient(),
                    displayName: x.getNameFirstNameFirst()
                }))
            } as AuthorViewModel);

        let element = new UiToolkit().createElement(html);
        this.autocompleteSection = element.find().byId("existing-author-autocomplete");
        this.autocompleteSection.on("click").matching("[data-author-id]").fire(this.onAuthorSelectedFromSuggestion)
        this.autocompleteSection.on("click").matching("#author-create-new").fire(this.onAuthorCreateNewFromInput)
        element.replaceContentsOf(target);
        return element;
    }

    private onAddAuthorKeyUp = (event: KeyboardEvent) => {
        const input = new UiElement(event.target as Element).value().get();

        if (input === "") {
            this.autocompleteSection.clear();
            return;
        }

        const suggestions = this.authorSuggester.suggest(input);


        const markup = require("../../../../view/book-modify-author-autocomplete.mustache")({
            suggestions: suggestions.map(s => ({
                id: s.author.id,
                matchType: s.perfectMatch ? "exact-match" : "partial-match",
                authorName: s.author.getNameLastNameFirst()

            })),
            hasInput: input !== ""
        });
        const newAutocompleteContents = new UiToolkit().createElement(markup);
        newAutocompleteContents.replaceContentsOf(this.autocompleteSection);


    }

    private onAddAuthorKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Enter") {
            event.preventDefault();
        }
    }


    public isDirty() {
        return !this.authorNameInput.value().isEmpty();
    }

    public markValidationError() {
        this.authorNameInput.class("is-validation-error").add();
    }


    private onDeleteAuthorEvent = (event: Event) => {
        let authorId = parseInt(new UiElement(event.target as Element).attr("data-author-id").get());
        this.selectedAuthors = this.selectedAuthors.filter(a => a.id !== authorId);
        this.insertInto(this.attachedTo);
    }

    private onAuthorSelectedFromSuggestion = (event: Event) => {
        const authorId = parseInt(new UiElement(event.target as Element).attr("data-author-id").get());
        this.selectedAuthors.push(this.allAuthors.filter(x => x.id === authorId)[0]);
        this.insertInto(this.attachedTo);
    }

    private onAuthorCreateNewFromInput = (event: Event) => {
        let authorInput = this.authorNameInput.value().get();
        if (authorInput === "") {
            this.markValidationError();
            return;
        }
        const author = new AuthorReferenceParser().parse(authorInput)
        this.selectedAuthors.push(Author.createTransient(author.firstName, author.middleName, author.lastName));
        this.insertInto(this.attachedTo);
    }

    removeValidationErrorMark() {
        this.authorNameInput.class("is-validation-error").remove();
    }
}

interface AuthorViewModel {
    authors: {
        transient: boolean
        displayName: string,
        id: number
    }[]

}
