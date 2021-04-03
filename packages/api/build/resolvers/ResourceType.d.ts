import Resource from '../schemas/Resource';
import ResourceService from '../services/ResourceService';
import ResourceTypeService, { ResourceTypeInput } from '../services/ResourceTypeService';
import { PaginationInput } from '../schemas/Pagination';
import ResourceType from '../schemas/ResourceType';
declare class ResourceTypeResolver {
    private readonly resourceService;
    private readonly resourceTypeService;
    constructor(resourceService: ResourceService, resourceTypeService: ResourceTypeService);
    type(typeId: string): Promise<ResourceType>;
    types(pagination: PaginationInput): Promise<Resource[]>;
    resources(resourceType: ResourceType): Promise<Resource[]>;
    addResourceType(resourceType: ResourceTypeInput): Promise<Resource>;
}
export default ResourceTypeResolver;
