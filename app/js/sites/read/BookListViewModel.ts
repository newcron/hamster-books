import { Group } from "../../data/grouping/Grouper"

export interface ReadBookListViewModel { 
    
    readCount: number,
    readingCount: number,
    groups: {
        groupName: string, 
        books: {
            id: number,
            title: string, 
            authorName: string, 
            addedDate: string, 
            readDate: string, 
            rating: number 
        }[]
    }[]
}