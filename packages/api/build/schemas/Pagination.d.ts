import { QueryBuilder } from 'knex';
declare class PaginationInput {
    offset?: number;
    limit?: number;
}
interface PaginationResponse<TItem> {
    count: number;
    items: TItem[];
    hasMore: boolean;
}
declare const addPagination: <TItem>(query: QueryBuilder<TItem, any>, input: PaginationInput) => Promise<PaginationResponse<TItem>>;
export { addPagination, PaginationResponse, PaginationInput, };
