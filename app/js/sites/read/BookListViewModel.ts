export interface ReadBookListViewModel {
    listName: string
    readCount: number,
    readingCount: number,
    thisYearRead: number,
    groups: {
        groupName: string,
        books: {
            id: number,
            readDurationDays: number,
            title: string,
            authorName: string,
            addedDate: string,
            readDate: string,
            rating: number,
            ratingExpanded: Star[],
            isCancelled: boolean,
            isMonthHighlight: boolean
        }[]
    }[]
}

export interface Star {
    isFull: boolean;
}
