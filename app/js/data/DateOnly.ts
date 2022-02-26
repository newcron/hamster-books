const DAYS_NON_LEAP_YEAR = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const DAYS_LEAP_YEAR = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const MS_PER_DAY = 1000 * 60 * 60 * 24;


export class DateOnly {
    public constructor(
        public readonly year: number,
        public readonly month: number,
        public readonly day: number) {

        if (year < 1900 || year > 2100) {
            throw new Error("Given year is outside of reasonable range: " + year);
        }
        if (month < 1 || month > 12) {
            throw new Error("Given month is outside of reasonable range: " + month);
        }
        if (day < 1 || day > daysInMonth(month, year)) {
            throw new Error("Given day is outside of reasonable range " + day);
        }
    }

    public toIsoString() {
        return `${this.year}-${zeroPad(this.month, 2)}-${zeroPad(this.day, 2)}`;
    }

    public static fromIsoString(str: string) {
        var bits = str.split("-");
        return new Date(parseInt(bits[0]), parseInt(bits[1]), parseInt(bits[2]));
    }

    public static fromDate(date: Date) {
        return new DateOnly(date.getFullYear(), date.getMonth() + 1, date.getDate());
    }

    public static today() {
        return DateOnly.fromDate(new Date());
    }

    public isBefore(after: DateOnly) {
        return this.asNumeric() < after.asNumeric();
    }

    public isAfter(before: DateOnly) {
        return this.asNumeric() > before.asNumeric();
    }

    public equals(other: DateOnly): boolean {
        return this.year === other.year && this.month === other.month && this.day === other.day;
    }

    public addDays(numDays: number): DateOnly {
        let d = this.asDate();
        d.setDate(d.getDate() + numDays);
        return DateOnly.fromDate(d);
    }


    public addYears(numYears: number): DateOnly {
        let d = this.asDate();
        d.setFullYear(d.getFullYear() + numYears);
        return DateOnly.fromDate(d);
    }


    public diffDays(other: DateOnly) {
        return Math.floor((this.asTimestamp() - other.asTimestamp()) / MS_PER_DAY);
    }

    public allDaysUntil = (until: DateOnly) => {
        if (until.isBefore(this)) {
            throw new Error("end date before start date");
        }

        const buf: DateOnly[] = [];
        let iterDate = this as unknown as DateOnly;

        do {
            buf.push(iterDate);
            iterDate = iterDate.addDays(1);
        } while (!iterDate.isAfter(until))
        return buf;
    }


    private asNumeric() {
        return this.day + this.month * 100 + this.year * 10000;
    }

    private asDate() {
        return new Date(this.year, this.month - 1, this.day);
    }

    private asTimestamp() {
        return Date.UTC(this.year, this.month - 1, this.day);
    }


}

function daysInMonth(monthNum: number, year: number) {
    const reference = isLeapYear(year) ? DAYS_LEAP_YEAR : DAYS_NON_LEAP_YEAR;
    return reference[monthNum - 1];
}

/*
     old wikipedia reference
     function isLeapYear (year):

         if ((year modulo 4 is 0) and (year modulo 100 is not 0))
         or (year modulo 400 is 0)
             then true
         else false
      */
function isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function zeroPad(num: number, places: number) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
}
