import { Field, ObjectType } from 'type-graphql';

@ObjectType()
class Document {
  @Field()
  public id: string = '';

  @Field()
  public name: string = '';
}

export default Document;
