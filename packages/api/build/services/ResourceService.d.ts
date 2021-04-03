import DBService from './DBService';
import * as tables from '../data/tables';
import { PaginationInput } from '../schemas/Pagination';
import Resource from '../schemas/Resource';
declare class FieldSearchInput {
    name?: string;
    value: string;
}
declare class SearchInput {
    ids?: string[];
    types?: string[];
    assignedTo?: string[];
    refs?: string[];
    text?: string;
    fields?: FieldSearchInput[];
}
declare class ResourceInput implements Partial<Resource> {
    id?: string;
    typeId: string;
    name: string;
    description?: string;
    ref?: string;
    status?: string;
    acquisitionTime?: number;
    acquisitionPrice?: number;
    acquisitionCurrency?: string;
}
declare class ResourceFieldInput {
    name: string;
    type: string;
    value: string;
}
declare class ResourceService {
    private readonly dbService;
    constructor(dbService: DBService);
    private get db();
    search: (input: SearchInput, pagination?: PaginationInput) => Promise<import("../schemas/Pagination").PaginationResponse<tables.Resource>>;
    add: (resource: ResourceInput, quantity: number, fields: ResourceFieldInput[]) => Promise<Resource>;
    delete: (resourceId: string) => Promise<void>;
    assign: (resourceId: string, assignTo?: string | undefined) => Promise<tables.Resource | undefined>;
    addDocuments: (resourceId: string, documentIds: string[]) => Promise<tables.Resource | undefined>;
    removeDocument: (resourceId: string, documentId: string) => Promise<tables.Resource | undefined>;
    setStatus: (resourceId: string, status?: string | undefined) => Promise<tables.Resource | undefined>;
    getAllChildren: (resourceId: string) => Promise<tables.Resource[]>;
}
export { SearchInput, FieldSearchInput, ResourceInput, ResourceFieldInput };
export default ResourceService;
