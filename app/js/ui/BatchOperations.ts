import { UiElement } from "./_impl/UiElement"

export class BatchOperations {

    remove() {
        return (element: Element) => {element.remove()}
    }

    class(className: string) {
        return {
            remove: () => (element: UiElement) => element.class(className).remove(), 
            add: () => (element: UiElement) => element.class(className).add(), 
            set: (value: boolean) => (element:UiElement) => { 
                value ? element.class(className).add() : element.class(className).remove() },
        }
    }
}