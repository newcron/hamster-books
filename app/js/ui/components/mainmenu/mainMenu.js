var ui = require('../../ui');
var Item = require('./Item');
var Menu = require('./Menu');


const READ_BOOKS_ITEM = new Item(ui.find().byId("read-books-action"));
const UNREAD_BOOKS_ITEM = new Item(ui.find().byId("unread-books-action"));
const NEW_BOOK_ITEM = new Item(ui.find().byId("new-book-action"));
const STATISTICS_ITEM = new Item(ui.find().byId("statistics-action"));

const MENU_ITEM = new Menu(ui.find().byId("main-navigation"))


var activeMenuItem = null;

module.exports = {
    "notifyChange": function (path) {


        if(activeMenuItem!==null) {
            activeMenuItem.setActive(false);
        }


        var navigationMenuStateClass = "is-on-new";
        activeMenuItem = NEW_BOOK_ITEM;
        if (path == "/read") {
            activeMenuItem = READ_BOOKS_ITEM;
            navigationMenuStateClass = "is-on-read";
        } else if (path == "/unread") {
            activeMenuItem = UNREAD_BOOKS_ITEM;
            navigationMenuStateClass = "is-on-unread";
        } else if (path == "/statistics") {
            activeMenuItem = STATISTICS_ITEM;
            navigationMenuStateClass = "is-on-statistics";
        }

        MENU_ITEM.setState(navigationMenuStateClass);
        activeMenuItem.setActive(true);
    },

    "menu": MENU_ITEM



};