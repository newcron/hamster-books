import { ErrorEventTarget, EventType } from "../ErrorEventTarget";

export class AjaxService {

    private async  makeRequest<T>(method: string, url: string, data?: any) : Promise<T> {
        console.log(url);
        return new Promise((resolve, reject)=>{
            
            const xhr = new XMLHttpRequest(); 
            xhr.open(method, url); 
            xhr.onreadystatechange = () => {
                if(xhr.readyState!= 4) {
                    return;
                }

                
                if (xhr.status >= 200 && xhr.status < 300) {
                    const payload = xhr.responseText;
                    const result = JSON.parse(payload);
                    resolve(result);
                } else {
    
                    
                    
                    if(xhr.status === 401) {
                        ErrorEventTarget.singleton().dispatchEvent(new CustomEvent(EventType.LOGIN_REQUIRED, {detail: JSON.parse(xhr.responseText).login})); 
                    } else { 
                        ErrorEventTarget.singleton().dispatchEvent(new CustomEvent(EventType.NET_ERROR, {detail: xhr.responseText}))
                    }
                    
                    reject({
                        status: xhr.status,
                        statusText: xhr.statusText,
                    });
                }
            }
            xhr.onerror = function () {
                const req = this as unknown as XMLHttpRequest; 
                ErrorEventTarget.singleton().dispatchEvent(new CustomEvent(EventType.NET_ERROR, {detail: xhr.responseText}))
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                });
            };
            if(data === undefined) {
                xhr.send();
            } else {
                xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                xhr.send(JSON.stringify(data));
            }

        });
    }

    public async get<T>(url: string) : Promise<T> {
        return this.makeRequest("GET", url);
    }

    public async post<T>(url: string, data: any) : Promise<T> {
        return this.makeRequest("POST", url, data);
    }
}


