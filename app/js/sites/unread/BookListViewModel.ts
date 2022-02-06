export interface UnreadBookListViewModel {

    unreadCount: number,
    oldSubCount: number,
    groups: {
        groupName: string,
        books: {
            id: number,
            title: string,
            addedDate: string,
            subDuration: number
        }[]
    }[]
}
