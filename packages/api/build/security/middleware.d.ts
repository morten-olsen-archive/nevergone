import { Express } from 'express';
interface Options {
    domain: string;
    clientId: string;
}
declare const create: ({ domain, clientId, }: Options) => Promise<Express>;
export default create;
