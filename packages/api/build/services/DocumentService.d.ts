import DBService from './DBService';
import * as tables from '../data/tables';
declare class DocumentInput implements Partial<tables.Document> {
    name?: string;
    description?: string;
}
declare class ResourceTypeService {
    private readonly dbService;
    constructor(dbService: DBService);
    private get db();
    add: (input: DocumentInput) => Promise<tables.Document | undefined>;
    get: (id: string) => Promise<tables.Document | undefined>;
}
export { DocumentInput };
export default ResourceTypeService;
