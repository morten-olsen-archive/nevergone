import { QueryBuilder } from 'knex';
import { InputType, Field } from 'type-graphql';

@InputType()
class PaginationInput {
  @Field({ nullable: true })
  public offset?: number;

  @Field({ nullable: true })
  public limit?: number;
}

interface PaginationResponse<TItem> {
  count: number;
  items: TItem[];
  hasMore: boolean;
}

const addPagination = async <TItem>(query: QueryBuilder<TItem>, input: PaginationInput) => {
  const count = await query.clone().count();
  let itemQuery = query;
  if (input.offset) {
    itemQuery = itemQuery.offset(input.offset);
  }
  if (input.limit) {
    itemQuery = itemQuery.limit(input.limit);
  }
  const items = await itemQuery;
  const response: PaginationResponse<TItem> = {
    count,
    items,
    hasMore: true,
  };
  return response;
};

export {
  addPagination,
  PaginationResponse,
  PaginationInput,
}
