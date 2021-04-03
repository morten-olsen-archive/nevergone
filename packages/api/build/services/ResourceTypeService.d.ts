import DBService from './DBService';
import * as tables from '../data/tables';
import { PaginationInput } from '../schemas/Pagination';
declare class ResourceTypeInput implements Partial<tables.ResourceType> {
    id?: string;
    name: string;
    description?: string;
    icon?: string;
}
declare class ResourceTypeService {
    private readonly dbService;
    constructor(dbService: DBService);
    private get db();
    add: (input: ResourceTypeInput) => Promise<tables.ResourceType | undefined>;
    list: (pagination?: PaginationInput) => Promise<import("../schemas/Pagination").PaginationResponse<tables.ResourceType>>;
    get: (id: string) => Promise<tables.ResourceType | undefined>;
}
export { ResourceTypeInput };
export default ResourceTypeService;
