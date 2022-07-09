import {UiToolkit} from "./ui/UiToolkit";
import view from "./ui/view";
import {BookListService} from "./BookListService";

export class ListSelectionDialog {
    constructor() {

        const bookListService = new BookListService();
        new UiToolkit().find().byId("list-selection-dialog-trigger").on("click").fireAndConsume(e => {


            view.showAsDialog(require("../view/list-selection-dialog.mustache"), {all: bookListService.getAll()});

            new UiToolkit().find().all("#list-selection-dialog [data-list-id]").forEach(element => {
                const id = element.attr("data-list-id").get();
                element.on("click").fire(event => {
                    bookListService.select(bookListService.getById(parseInt(id)));
                    window.location.reload();
                });
            })
        });

    }
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
