import Document from './Document';
import ResourceField from './ResourceField';
import ResourceType from './ResourceType';
declare class Resource {
    id: string;
    typeId: string;
    type: ResourceType;
    name: string;
    description?: string;
    ref?: string;
    status?: string;
    assignedToId?: string;
    assignedTo?: Resource;
    fields?: ResourceField[];
    assignments: Resource[];
    documents: Document[];
    acquisitionTime?: number;
    acquisitionPrice?: number;
    acquisitionCurrency?: string;
    totalPrice?: number;
}
export default Resource;
