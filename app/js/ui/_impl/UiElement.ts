import {Finder} from "./Finder";

export class UiElement {
    constructor(private element: Element) {
        if (this.element === null || this.element === undefined) {
            throw "element does not exist";
        }
    }

    find(): Finder {
        return new Finder(this.element);
    }

    children(): UiElement[] {
        return [].slice.call(this.element.children).map((x: Element) => new UiElement(x));
    }

    attr(attributeName: string) {
        return {
            get: () => this.element.getAttribute(attributeName),
            set: (value: string) => this.element.setAttribute(attributeName, value)
        }
    }

    appendTo(newTarget: UiElement) {
        newTarget.element.appendChild(this.element);
    }

    replaceContentsOf(newTarget: UiElement) {
        newTarget.children().forEach(x => x.remove());
        this.appendTo(newTarget);
    }

    class(className: string) {
        var cl = this.element.classList;
        return {
            add: () => {
                if (!cl.contains(className)) {
                    cl.add(className);
                }
            },

            remove: () => {
                if (cl.contains(className)) {
                    cl.remove(className);
                }
            },

            toggle: () => {
                if (cl.contains(className)) {
                    cl.remove(className);
                } else {
                    cl.add(className);
                }
            },

            isPresent: () => cl.contains(className),

            set: (enableClass: boolean) => {
                if (enableClass && !cl.contains(className)) {
                    cl.add(className);
                } else if (cl.contains(className)) {
                    cl.remove(className);
                }
            }
        }
    }

    text() {
        return {
            get: () => this.element.textContent,
            set: (newValue: string) => {
                this.element.textContent = newValue
            },
            isEmpty: () => !isPresent(this.element.textContent),
            isPresent: () => isPresent(this.element.textContent)
        }
    }

    value() {
        var ie = this.element as HTMLInputElement;
        return {
            get: () => ie.value,
            set: (newValue: string) => {
                ie.textContent = newValue
            },
            isEmpty: () => !isPresent(ie.value),
            isPresent: () => isPresent(ie.value),
            map: <T>(mapper: (x: string) => T) => isPresent(ie.value) ? mapper(ie.value) : undefined
        }
    }

    checked() {
        var ie = this.element as HTMLInputElement;
        return {
            get: () => ie.checked,
            set: (newValue: boolean) => {
                ie.checked = newValue
            }
        }
    }

    remove() {
        this.element.parentNode.removeChild(this.element);
    }

    on(eventName: string) {
        return {
            fire: (callback: EventListener) => {
                this.element.addEventListener(eventName, callback);
                return {
                    andEvaluateNow: () => {
                        callback(new Event(eventName));
                    }
                }
            },

            fireAndConsume: (callback: EventListener) => {
                this.element.addEventListener(eventName, (event: Event) => {
                    event.preventDefault();
                    callback(event);
                })
                return {
                    andEvaluateNow: () => {
                        callback(new Event(eventName));
                    }
                }
            },

            disarm: (callback: EventListener) => {
                this.element.removeEventListener(eventName, callback);
            },

            matching: (subSelector: string) => {
                return {
                    fire: (callback: EventListener) => {
                        this.element.addEventListener(eventName, (event: Event) => {
                            if ([].slice.call(this.element.querySelectorAll(subSelector)).indexOf(event.target) !== -1) {
                                callback(event);
                            }
                        })
                        return {
                            andEvaluateNow: () => {
                                callback(new Event(eventName));
                            }
                        }
                    },

                    fireAndConsume: (callback: EventListener) => {
                        this.element.addEventListener(eventName, (event: Event) => {
                            if ([].slice.call(this.element.querySelectorAll(subSelector)).indexOf(event.target) !== -1) {
                                event.preventDefault();
                                callback(event);
                            }
                            return {
                                andEvaluateNow: () => {
                                    callback(new Event(eventName));
                                }
                            }
                        })

                    }
                }
            }
        }
    }


    clear() {
        this.children().forEach(x => x.remove());
    }
}

function isPresent(value: any) {
    return value !== undefined && value !== null && value !== "";
}
