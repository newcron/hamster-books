let element : ErrorEventTarget = undefined;

export class ErrorEventTarget {
    fragment: DocumentFragment;
    
    private constructor() {
        this.fragment = document.createDocumentFragment(); 
    }

    public static singleton() {
        if(element === undefined) {
            element = new ErrorEventTarget(); 
        }
        return element;
    }

    public dispatchEvent(e: Event) {
        this.fragment.dispatchEvent(e);
    }

    public addEventListener(type: EventType, listener: (e: Event)=>void) {
        this.fragment.addEventListener(type, listener);
    }


}

export enum EventType { 
    NET_ERROR  = "NET_ERROR", 
    LOGIN_REQUIRED = "LOGIN_REQUIRED"
}