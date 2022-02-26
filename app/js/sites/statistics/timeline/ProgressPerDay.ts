import {DateOnly} from "../../../data/DateOnly";
import {Progress} from "./Progress";
import {MonthOnly} from "../../../data/MonthOnly";

export class ProgressPerDay<T> {
    public constructor(public readonly date: DateOnly, public readonly progress: Progress<T>[]) {

    }

    public month() {
        return MonthOnly.fromDate(this.date);
    }
}
