import Knex from 'knex';
declare type MigrationType = {
    name: string;
    up: (knex: Knex) => Promise<void>;
    down: (knex: Knex) => Promise<void>;
};
declare const migrations: MigrationType[];
export { MigrationType };
export default migrations;
