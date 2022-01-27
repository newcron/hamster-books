import { Book } from "../Book";

export class Grouper {

    public constructor(private groupingStrategy: GroupingStrategy) {

    }

    public assign(books: Book[],): Group[] {
        const assigned = new Map<GroupName, Book[]>();
        const result: Group[] = [];
        books.forEach(b => {
            let tempResult = this.groupingStrategy.assign(b);
            const groups = Array.isArray(tempResult) ? tempResult : [tempResult];
    
            groups.forEach(group=>{
                if (!assigned.has(group)) {
                    assigned.set(group, []);
                }
                assigned.get(group).push(b);
            })
            
        })
        assigned.forEach((books, groupName) => {
            result.push(this.groupingStrategy.groupFactoryFunction(groupName, books));
        })
        result.sort(this.groupingStrategy.groupSortingFunction);
        return result;
    }
}

export interface Group {
    readonly groupTitle: string;
    readonly books: Book[];
}



export type GroupName = string;

export interface GroupingStrategy {
    assign(book: Book): GroupName | GroupName[]
    groupFactoryFunction(name: GroupName, books: Book[]) : Group,
    groupSortingFunction(a: Group, b: Group) : number
}

