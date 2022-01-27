import { UiElement } from "./UiElement";

export class Finder { 

    constructor(private element : Element) {

    }

    byId(id: string) : UiElement {
        const matches = this.element.querySelectorAll(`#${id}`); 
        if(matches.length === 0) {
            throw new Error("Could not find descending element with id "+id); 
        } else if(matches.length > 1) {
            throw new Error("Could not find unique descending element with id "+id); 
        }

        return new UiElement(matches[0]);
    }

    all(selector: string) : UiElement[] {
        // [].slice.call --> convert node list to normal array
        return [].slice.call(this.element.querySelectorAll(selector)).map((x:Element)=>new UiElement(x));
    }

}