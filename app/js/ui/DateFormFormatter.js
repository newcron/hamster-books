var XDate = require('xdate');

class DateFormFormatter {

    format(date) {
        if (date instanceof XDate) {
            return date.toString("yyyy-MM-dd")
        } else {
            throw "Invalid Usage of Formatter. Requires XDate object.";
        }
    }
}

module.exports = DateFormFormatter;