import Resource from '../schemas/Resource';
import { Service } from 'typedi';
import DBService from '../services/DBService';
import { Query, Root, Resolver, Mutation, Arg, FieldResolver } from 'type-graphql';
import * as tables from '../data/tables';
import Document from '../schemas/Document';
import ResourceField from '../schemas/ResourceField';
import ResourceService, { ResourceInput, ResourceFieldInput, SearchInput } from '../services/ResourceService';
import ResourceTypeService from '../services/ResourceTypeService';
import { PaginationInput } from '../schemas/Pagination';
import ResourceType from '../schemas/ResourceType';

@Service()
@Resolver(() => Resource)
class ResourceResolver {
  constructor(
    private readonly dbService: DBService,
    private readonly resourceService: ResourceService,
    private readonly resourceTypeService: ResourceTypeService,
  ) {}

  private get db() {
    return this.dbService.db;
  }

  @Query(() => Resource)
  async resource(
    @Arg('id') id: string,
  ): Promise<Resource[]> {
    const result = await this.resourceService.search({
      ids: [id],
    });
    return result.items[0] as any;
  }

  @Query(() => [Resource])
  async resources(
    @Arg('input', { defaultValue: {} }) input: SearchInput,
    @Arg('pagination', { defaultValue: {} }) pagination: PaginationInput,
  ): Promise<Resource[]> {
    const result = await this.resourceService.search(input, pagination);
    return result.items as any;
  }

  @FieldResolver()
  async typeId(@Root() resource: Resource): Promise<string> {
    return resource.type as any
  }

  @FieldResolver()
  async type(@Root() resource: Resource): Promise<ResourceType> {
    const result = await this.resourceTypeService.get(resource.type as any);
    return result as any;
  }

  @FieldResolver()
  async assignedToId(@Root() resource: Resource): Promise<string | undefined> {
    return resource.assignedTo as any
  }

  @FieldResolver()
  async assignedTo(@Root() resource: Resource): Promise<Resource | undefined> {
    if (!resource.assignedTo) {
      return undefined;
    }
    const result = await this.resourceService.search({
      ids: [resource.assignedTo as any],
    });
    return result.items[0] as any;
  }

  @FieldResolver()
  async assignments(@Root() resource: Resource): Promise<Resource[]> {
    const result = await this.resourceService.search({
      assignedTo: [resource.id],
    });
    return result.items as any;
  }

  @FieldResolver()
  async fields(@Root() resource: Resource): Promise<ResourceField[]> {
    const fields = await this.db<tables.ResourceField>('resource_fields')
      .where('resource', resource.id);
    return fields as any;
  }

  @FieldResolver()
  async totalPrice(
    @Arg('currency') currency: string,
    @Root() resource: Resource,
  ): Promise<number> {
    const children = await this.resourceService.getAllChildren(resource.id);
    const childPrice = children.filter(c => c.acquisitionPrice).reduce((output, current) => output + current.acquisitionPrice!, 0);
    return childPrice + (resource.acquisitionPrice || 0);
  }

  @FieldResolver()
  async documents(@Root() resource: Resource): Promise<Document[]> {
    const documents = await this.db<tables.Resource>('resource_documents')
      .join('documents', 'documents.id', '=', 'resource_documents.document')
      .where('resource_documents.resource', resource.id);
    return documents as any;
  }

  @Mutation(() => [Resource])
  async addResources(
    @Arg('resource') resource: ResourceInput,
    @Arg('quantity', { nullable: true, defaultValue: 1 }) quantity: number,
    @Arg('fields', () => [ResourceFieldInput], { defaultValue: [] }) fields: ResourceFieldInput[],
  ): Promise<Resource> {
    const response = await this.resourceService.add(
      resource,
      quantity,
      fields,
    );
    return response;
  }

  @Mutation(() => Boolean) 
  async deleteResource(
    @Arg('resourceId') resourceId: string,
  ): Promise<boolean> {
    await this.resourceService.delete(
      resourceId,
    );
    return true;
  }

  @Mutation(() => Resource)
  async assignResource(
    @Arg('resourceId') resourceId: string,
    @Arg('assignTo', { nullable: true }) assignTo?: string,
  ) {
    const result = await this.resourceService.assign(resourceId, assignTo);
    return result;
  }

  @Mutation(() => Resource)
  async addDocumentsToResource(
    @Arg('resourceId') resourceId: string,
    @Arg('documentIds', () => [String]) documentIds: string[],
  ) {
      const result = await this.resourceService.addDocuments(resourceId, documentIds);
    return result;
  }

  @Mutation(() => Resource)
  async removeDocumentFromResource(
    @Arg('resourceId') resourceId: string,
    @Arg('documentId') documentId: string,
  ) {
    const result = await this.resourceService.removeDocument(resourceId, documentId);
    return result;
  }

  @Mutation(() => Resource)
  async setResourceStatus(
    @Arg('resourceId') resourceId: string,
    @Arg('status', { nullable: true }) status?: string,
  ) {
    await this.db<tables.Resource>('resources').update({
      status,
    }).where({ id: resourceId });
    return this.db<tables.Resource>('resources').where({ id: resourceId }).first();
  }
}

export default ResourceResolver;
