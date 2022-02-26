import {Progress} from "./Progress";
import {MonthOnly} from "../../../data/MonthOnly";

export class ProgressPerMonth<T> {
    public constructor(public readonly date: MonthOnly, public readonly progress: Progress<T>[]) {

    }

    public sum(): number {
        return this.progress.reduce((prev, current) => prev + (current.amount as unknown as number), 0);
    }
}
