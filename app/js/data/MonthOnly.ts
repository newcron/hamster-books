import {DateOnly} from "./DateOnly";

const MONTH_NAMES = ["Jan.", "Feb.", "März", "April", "Mai", "Juni", "Juli", "Aug.", "Sept.", "Okt.", "Nov.", "Dez"]

export class MonthOnly {

    public constructor(public readonly year: number, public readonly month: number) {
        if (year < 1900 || year > 2100) {
            throw new Error("Given year is outside of reasonable range: " + year);
        }
        if (month < 1 || month > 12) {
            throw new Error("Given month is outside of reasonable range: " + month);
        }
    }

    public asString(): string {
        return MONTH_NAMES[this.month - 1] + " " + this.year % 100;
    }

    public static fromDate(d: DateOnly) {
        return new MonthOnly(d.year, d.month)
    }

    public previousMonth() {
        return this.month === 1 ? new MonthOnly(this.year - 1, 12) : new MonthOnly(this.year, this.month - 1);
    }

    public contains(d: DateOnly) {
        return this.year === d.year && this.month === d.month;
    }

    firstOfMonth() {
        return new DateOnly(this.year, this.month, 1);
    }
}
