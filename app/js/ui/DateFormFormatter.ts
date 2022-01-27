import XDate from "xdate";

export class DateFormFormatter {

    format(date: XDate) {
        if (date instanceof XDate) {
            return date.toString("yyyy-MM-dd")
        } else {
            throw new Error("Invalid Usage of Formatter. Requires XDate object.");
        }
    }
}
