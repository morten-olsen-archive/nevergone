import Knex from 'knex';
declare const name = "init";
declare const up: (knex: Knex) => Promise<void>;
declare const down: (knex: Knex) => Promise<void>;
export { name, up, down };
