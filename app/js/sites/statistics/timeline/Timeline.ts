import {DateOnly} from "../../../data/DateOnly";
import {Progress} from "./Progress";
import {ProgressPerDay} from "./ProgressPerDay";
import {ProgressPerMonth} from "./ProgressPerMonth";
import {MonthOnly} from "../../../data/MonthOnly";

export class Timeline<T> {


    private readonly contributions = new Map<string, Progress<T>[]>()


    public recognize(date: DateOnly, progress: Progress<T>) {

        let key = this.key(date);
        if (!this.contributions.has(key)) {
            this.contributions.set(key, []);
        }
        this.contributions.get(key).push(progress);
    }

    public dailyHistory(fromDate: DateOnly): ProgressPerDay<T>[] {
        return fromDate.allDaysUntil(DateOnly.today()).map(date => new ProgressPerDay(date, this.progressOn(date)))
    }

    public monthlyHistory(fromDate: DateOnly): ProgressPerMonth<T>[] {
        var items: MonthAccumulator<T>[] = [];

        this.dailyHistory(fromDate).forEach(day => {
                if (items.length === 0) {
                    items.push(new MonthAccumulator<T>(day.month()));
                } else if (!items[items.length - 1].month.contains(day.date)) {
                    items.push(new MonthAccumulator<T>(day.month()));
                }
                items[items.length - 1].add(day)
            }
        )

        return items.map(p => new ProgressPerMonth<T>(p.month, p.progres))

    }


    progressOn(date: DateOnly): Progress<T>[] {
        let key = date.toIsoString();
        return this.contributions.has(key) ? this.contributions.get(key) : [];
    }

    private key(date: DateOnly) {
        return date.toIsoString();
    }


}

class MonthAccumulator<T> {

    readonly progres: Progress<T>[];

    constructor(public readonly month: MonthOnly) {
        this.progres = [];
    }

    add(pperDay: ProgressPerDay<any>) {
        this.progres.push(...pperDay.progress);
    }

}
