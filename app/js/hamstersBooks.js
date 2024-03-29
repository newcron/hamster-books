var dispatcher = require("./dispatcher");

var loadingDialog = require("./ui/loadingDialog");
var XDate = require("xdate");

require("../style/hamstersbooks.less")
const {ListSelectionDialog} = require("./ListSelectionDialog");
const {BookListService} = require("./BookListService");


XDate.locales['de'] = {
    monthNames: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
    monthNamesShort: ['Jan.', 'Feb.', 'März', 'Apr.', 'Mai', 'Jun.', 'Jul.', 'Aug.', 'Sept.', 'Okt.', 'Nov.', 'Dez.'],
    dayNames: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
    dayNamesShort: ['So.', 'Mo.', 'Di.', 'Mi.', 'Do.', 'Fr.', 'Sa.']
};

new ListSelectionDialog();
loadingDialog.show();

new BookListService().load().then(dispatcher.start);

