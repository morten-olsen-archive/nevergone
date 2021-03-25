import { Service } from 'typedi';
import { nanoid } from 'nanoid';
import { InputType, Field } from 'type-graphql';
import DBService from './DBService';
import * as tables from '../data/tables';
import { PaginationInput, addPagination } from '../schemas/Pagination';
import Resource from '../schemas/Resource';

@InputType()
class FieldSearchInput {
  @Field({ nullable: true })
  public name?: string;

  @Field()
  public value: string = '';
}

@InputType()
class SearchInput {
  @Field(() => [String], { nullable: true })
  public ids?: string[];

  @Field(() => [String], { nullable: true })
  public types?: string[];

  @Field(() => [String], { nullable: true })
  public assignedTo?: string[];

  @Field(() => [String], { nullable: true })
  public refs?: string[];

  @Field({ nullable: true })
  public text?: string;

  @Field(() => [FieldSearchInput], { nullable: true })
  public fields?: FieldSearchInput[];
}

@InputType()
class ResourceInput implements Partial<Resource> {
  @Field({ nullable: true })
  public id?: string;

  @Field()
  public typeId: string = '';

  @Field()
  public name: string = '';

  @Field({ nullable: true })
  public description?: string;

  @Field({ nullable: true })
  public ref?: string;

  @Field({ nullable: true })
  public status?: string;

  @Field({ nullable: true })
  public acquisitionTime?: number;

  @Field({ nullable: true })
  public acquisitionPrice?: number;

  @Field({ nullable: true })
  public acquisitionCurrency?: string;
}

@InputType()
class ResourceFieldInput {
  @Field()
  name: string = '';

  @Field()
  type: string = '';

  @Field()
  value: string = '';
}

@Service()
class ResourceService {
  constructor(
    private readonly dbService: DBService
  ) {}

  private get db() {
    return this.dbService.db;
  }

  search = async (input: SearchInput, pagination: PaginationInput = {}) => {
    let query = this.db<tables.Resource>('resources');

    if (input.ids) {
      query = query.whereIn('id', input.ids);
    }

    if (input.types) {
      query = query.whereIn('type', input.types);
    }

    if (input.refs) {
      query  = query.whereIn('ref', input.refs);
    }

    if (input.assignedTo) {
      query  = query.whereIn('assignedTo', input.assignedTo);
    }

    if (input.text) {
      throw new Error('Full text search not yet implemented');
    }

    if (input.fields) {
      throw new Error('Field search not yet implemented');
    }

    const result = await addPagination(query, pagination);

    return result;
  };

  add = async (
    resource: ResourceInput,
    quantity: number,
    fields: ResourceFieldInput[],
  ): Promise<Resource> => {
    const trx = await this.db.transaction();
    const resources = new Array(quantity).fill(undefined).map<tables.Resource>(() => ({
      type: resource.typeId,
      id: resource.id || nanoid(),
      name: resource.name,
      ref: resource.ref,
      status: resource.status,
      description: resource.description,
      acquisitionCurrency: resource.acquisitionCurrency,
      acquisitionTime: resource.acquisitionTime,
      acquisitionPrice: resource.acquisitionPrice,
      
    }));
    await trx<tables.Resource>('resources').insert(resources);
    await trx.commit();

    const result = await this.search({
      ids: resources.map(resource => resource.id),
    });
    return result.items as any;
  }
  
  delete = async (
    resourceId: string,
  ) => {
    await this.db<tables.Resource>('resources').delete().where({ id: resourceId });
  }

  assign = async (
    resourceId: string,
    assignTo?: string,
  ) => {
    await this.db<tables.Resource>('resources').update({
      assignedTo: assignTo,
    }).where({ id: resourceId });
    return this.db<tables.Resource>('resources').where({ id: resourceId }).first();
  }

  addDocuments = async (
    resourceId: string,
    documentIds: string[],
  ) => {
    const documents = documentIds.map((documentId) => ({
      resource: resourceId,
      document: documentId,
    }));
    await this.db('resource_documents').insert(documents);
    return this.db<tables.Resource>('resources').where({ id: resourceId }).first();
  }

  removeDocument = async (
    resourceId: string,
    documentId: string,
  ) => {
    await this.db('resource_documents').delete().where({
      resource: resourceId,
      document: documentId,
    });
    return this.db<tables.Resource>('resources').where({ id: resourceId }).first();
  }

  setStatus = async (
    resourceId: string,
    status?: string,
  ) => {
    await this.db<tables.Resource>('resources').update({
      status,
    }).where({ id: resourceId });
    return this.db<tables.Resource>('resources').where({ id: resourceId }).first();
  }

  getAllChildren = async (resourceId: string): Promise<tables.Resource[]> => {
    let toScan: string[] = [resourceId];
    let result: tables.Resource[] = [];

    while (toScan.length > 0) {
      const { items } = await this.search({ assignedTo: toScan });
      result = [...result, ...items];
      toScan = items.map(item => item.id);
    };

    return result;
  }
}

export { SearchInput, FieldSearchInput, ResourceInput, ResourceFieldInput };
export default ResourceService;
