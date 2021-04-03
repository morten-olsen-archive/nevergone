import { Express } from 'express';
import Knex from 'knex';
declare const create: (db: Knex) => Express;
export default create;
