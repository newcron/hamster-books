import XDate from "xdate";
import { Author, Book } from "../../data/Book";
import { DateFormFormatter } from "../../ui/DateFormFormatter";
import { UiToolkit } from "../../ui/UiToolkit";
import { UiElement } from "../../ui/_impl/UiElement";
import { AuthorSuggester } from "./AuthorSuggester";
import { EditBookForm } from "./EditBookForm";
import { FormDataExtractor } from "./FormDataExtractor";


export class EditFormViewController {   

    private authorSuggester : AuthorSuggester; 
    constructor(private form: EditBookForm, authors : Author[], private bookToEdit?: Book, ) {
        this.authorSuggester = new AuthorSuggester(authors);
    }

    showForm() {
        
        this.form.isReadCheckbox().on("change").fire(this.toggleReadNotesSection).andEvaluateNow()
        this.form.getForm().on("submit").fireAndConsume(this.submitFormData);
        this.form.addAuthorField().on("keyup").fire(this.onAuthorInputFieldChange); 

    }

    private toggleReadNotesSection = () => {
        const readIsChecked = this.form.isReadCheckbox().checked().get()
        if(readIsChecked && this.form.startedReadingField().value().isEmpty()) {
            this.form.startedReadingField().value().set(new DateFormFormatter().format(new XDate()))
        }
        this.form.allReadContextElements().forEach(new UiToolkit().batch().class("hidden").set(!readIsChecked))
    }

    private onAuthorInputFieldChange = (event : KeyboardEvent) => {
        if(event.key === 'Enter') {
            event.preventDefault();
            this.onAuthorSelected(); 
        }

        const input = this.form.addAuthorField().value().get();
        if(event.key  === " " && input.indexOf(",")===-1) {
            event.preventDefault();
        }

        const suggestions = this.authorSuggester.suggest(input)
        const autocompleteSection = this.form.authorAutocompleteSection(); 
        this.removeAutocompleteSection();
        if(input.trim() === "") {
            return;
        }
        
        
        const markup = require("../../../view/book-modify-author-autocomplete.mustache")( {   
            suggestions: suggestions.map(s=>({id: s.author.id, matchType: s.perfectMatch ? "exact-match" :"partial-match", authorName: s.author.getNameLastNameFirst()}))
        });
        

        const newUi = new UiToolkit().createElement(markup); 
        newUi.find().all("[data-author-id]").forEach(newAuthorElement=>newAuthorElement.on("click").fire((event)=>{
            const el = new UiElement(event.target as Element).attr("data-author-id").get();
            this.removeAutocompleteSection();
        }));
        newUi.appendTo(autocompleteSection);

           
        
    }

    private onAuthorSelected = () => {
        console.log(this.authorSuggester.suggest(this.form.addAuthorField().value().get()));
    }



    private submitFormData = () => {
        const data = new FormDataExtractor(this.form, this.bookToEdit).extract();
        console.log(data);
    }

    private removeAutocompleteSection() {
        this.form.authorAutocompleteSection().children().forEach(x => x.remove());
    }
}
