import Knex from 'knex';
import * as init from './init';

type MigrationType = {
  name: string;
  up: (knex: Knex) => Promise<void>;
  down: (knex: Knex) => Promise<void>;
}

const migrations: MigrationType[] = [
  init,
];

export { MigrationType };
export default migrations;
