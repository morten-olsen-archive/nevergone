import { ObjectType, Field } from 'type-graphql';

@ObjectType()
class ResourceField {
  @Field()
  public resource: string = '';

  @Field()
  public name: string = '';

  @Field()
  public type: string = '';

  @Field()
  public value: string = '';
}

export default ResourceField;
