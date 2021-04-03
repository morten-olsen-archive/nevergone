import knex, { Config } from 'knex';
declare const setup: (config: Config) => Promise<knex<any, unknown[]>>;
export default setup;
