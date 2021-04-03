import Knex from 'knex';
declare class DBService {
    private _db;
    get db(): Knex;
}
export default DBService;
