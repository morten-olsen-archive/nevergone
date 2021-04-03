interface Resource {
    id: string;
    name: string;
    type: string;
    ref?: string;
    description?: string;
    assignedTo?: string;
    status?: string;
    acquisitionDate?: number;
    acquisitionPrice?: number;
    acquisitionCurrency?: string;
}
export default Resource;
