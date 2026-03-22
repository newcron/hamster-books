let element : CommunicationsErrorHandler = undefined;

export class CommunicationsErrorHandler {
    fragment: DocumentFragment;
    
    private constructor() {
        this.fragment = document.createDocumentFragment(); 
    }

    public static singleton() {
        if(element === undefined) {
            element = new CommunicationsErrorHandler(); 
        }
        return element;
    }
    
    public onAuthenticationRequired(loginUrl: string) {
        window.location.href = loginUrl;
    }
    
    public onNetworkError(detail: any) {
        alert("Netzwerk Fehler:\n\n"+detail);
    }
    



}

export enum EventType { 
    NET_ERROR  = "NET_ERROR", 
    LOGIN_REQUIRED = "LOGIN_REQUIRED"
}