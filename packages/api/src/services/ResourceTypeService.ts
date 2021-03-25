import { Service } from 'typedi';
import { nanoid } from 'nanoid';
import { InputType, Field } from 'type-graphql';
import DBService from './DBService';
import * as tables from '../data/tables';
import { PaginationInput, addPagination } from '../schemas/Pagination';

@InputType()
class ResourceTypeInput implements Partial<tables.ResourceType> {
  @Field({ nullable: true })
  public id?: string;

  @Field()
  public name: string = '';

  @Field({ nullable: true })
  public description?: string;

  @Field({ nullable: true })
  public icon?: string;
}

@Service()
class ResourceTypeService {
  constructor(
    private readonly dbService: DBService
  ) {}

  private get db() {
    return this.dbService.db;
  }

  public add = async (input: ResourceTypeInput) => {
    const id = input.id || nanoid();
    await this.db<tables.ResourceType>('resource_types').insert({
      id,
      name: input.name,
      icon: input.icon,
      description: input.description,
    });
    return this.db<tables.ResourceType>('resource_types').where({ id }).first();
  }

  public list = async (pagination: PaginationInput = {}) => {
    const query = this.db<tables.ResourceType>('resource_types');
    const result = await addPagination(query, pagination);
    return result;
  }

  public get = async (id: string) => {
    const query = this.db<tables.ResourceType>('resource_types').where({ id }).first();
    const result = await query;
    return result;
  };
}

export { ResourceTypeInput };

export default ResourceTypeService;
