import {AjaxService} from "./net/AjaxRequest";

const ajaxService = new AjaxService();

let lists: BookList[];

export class BookListService {


    constructor() {
    }

    async load() {


        // can't use book list service here due to circular reference
        const api = await ajaxService.get("api/book-list") as BookListApiModel;
        let defaultSelected = null;
        const list: BookList[] = [];
        api.all.forEach(item => {
            const converted = {id: item.id, name: item.name};
            list.push(converted)
            if (item.defaultList) {
                defaultSelected = converted;
            }
        })
        lists = list;

        if (window.localStorage.getItem("selectedList") == null) {
            this.select(defaultSelected);
        }

    }

    getSelected(): BookList {
        return this.getById(parseInt(window.localStorage.getItem("selectedList")));
    }

    select(l: BookList) {
        window.localStorage.setItem("selectedList", "" + l.id);

    }

    getAll(): BookList[] {
        return lists;
    }

    getById(id: number) {
        for (let list of lists) {
            if (list.id == id) {
                return list;
            }
        }
        throw "List with id " + id + " does not exist";

    }
}


export interface BookList {
    id: number,
    name: string
}


interface BookListApiModel {
    selected: {
        id: number
        name: string
        defaultList: boolean
    },
    all: [{
        id: number,
        name: string,
        defaultList: boolean
    }]
}
