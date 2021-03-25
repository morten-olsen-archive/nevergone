import Resource from '../schemas/Resource';
import { Service } from 'typedi';
import { Query, Root, Resolver, Mutation, Arg, FieldResolver } from 'type-graphql';
import ResourceService from '../services/ResourceService';
import ResourceTypeService, { ResourceTypeInput } from '../services/ResourceTypeService';
import {PaginationInput} from '../schemas/Pagination';
import ResourceType from '../schemas/ResourceType';

@Service()
@Resolver(() => ResourceType)
class ResourceTypeResolver {
  constructor(
    private readonly resourceService: ResourceService,
    private readonly resourceTypeService: ResourceTypeService,
  ) {}

  @Query(() => ResourceType)
  async type(
    @Arg('typeId') typeId: string,
  ): Promise<ResourceType> {
    const result = await this.resourceTypeService.get(typeId);
    return result as any;
  }

  @Query(() => [ResourceType])
  async types(
    @Arg('pagination', { defaultValue: {} }) pagination: PaginationInput,
  ): Promise<Resource[]> {
    const result = await this.resourceTypeService.list(pagination);
    return result.items as any;
  }

  @FieldResolver(() => [Resource])
  async resources(@Root() resourceType: ResourceType): Promise<Resource[]> {
    const result = await this.resourceService.search({
      types: [resourceType.id],
    });
    return result.items as any;
  }

  @Mutation(() => Resource)
  async addResourceType(
    @Arg('resourceType') resourceType: ResourceTypeInput,
  ): Promise<Resource> {
    const response = await this.resourceTypeService.add(resourceType);
    return response! as any;
  }
}

export default ResourceTypeResolver;
