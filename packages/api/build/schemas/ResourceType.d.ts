import Resource from './Resource';
declare class ResourceType {
    id: string;
    name: string;
    description?: string;
    icon?: string;
    resources: Resource[];
}
export default ResourceType;
