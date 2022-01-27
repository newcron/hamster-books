
export interface AuthorApiResponse {
    authors: AuthorApiFormat[]
}

export interface AuthorApiFormat {
    id: number;
    firstName?: string;
    middleName?: string;
    lastName?: string;
}