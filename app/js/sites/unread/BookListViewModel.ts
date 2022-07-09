export interface UnreadBookListViewModel {
    listName: string
    unreadCount: number,
    oldSubCount: number,
    unreadTime: number,
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
