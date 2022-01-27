import { BatchOperations } from "./BatchOperations";
import { Finder } from "./_impl/Finder";
import { UiElement } from "./_impl/UiElement";

export class UiToolkit {
    find() {
        return new Finder(document.body);
    }

    afterInit(callback: EventListener) {
     if (document.readyState !== "loading") {
            callback(new Event("DOMContentLoaded"));
        } else {
            document.addEventListener("DOMContentLoaded", callback);
        }
    }

    createElement(htmlStructure: string) {
        let dummyElement = document.createElement("div");
        dummyElement.innerHTML = htmlStructure;
    
        let element = new UiElement(dummyElement.firstChild as Element);
    
    
        return element;
    }


    batch() {
        return new BatchOperations(); 
    }
}