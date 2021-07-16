export interface Pagination<T> {
    content: T;
    totalElements: number;
    totalPages: number;
}