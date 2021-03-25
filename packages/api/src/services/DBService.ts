import { Service, Inject } from "typedi";
import Knex from 'knex';

@Service()
class DBService {
  @Inject('db')
  private _db: Knex = undefined as any;

  public get db(): Knex {
    return this._db;
  }
}

export default DBService;
