import { Service } from 'typedi';
import { nanoid } from 'nanoid';
import { InputType, Field } from 'type-graphql';
import DBService from './DBService';
import * as tables from '../data/tables';

@InputType()
class DocumentInput implements Partial<tables.Document> {
  @Field({ nullable: true })
  public name?: string;

  @Field({ nullable: true })
  public description?: string;
}

@Service()
class ResourceTypeService {
  constructor(
    private readonly dbService: DBService
  ) {}

  private get db() {
    return this.dbService.db;
  }

  public add = async (input: DocumentInput) => {
    const id = nanoid();
    await this.db<tables.Document>('documents').insert({
      id,
      name: input.name,
      description: input.description,
    });
    return this.db<tables.Document>('documents').where({ id }).first();
  }

  public get = async (id: string) => {
    const query = this.db<tables.Document>('documents').where({ id }).first();
    const result = await query;
    return result;
  };
}

export { DocumentInput };

export default ResourceTypeService;
