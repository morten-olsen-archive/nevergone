import { ObjectType, Field } from 'type-graphql';
import Resource from './Resource';

@ObjectType()
class ResourceType {
  @Field()
  public id: string = '';

  @Field()
  public name: string = '';

  @Field({ nullable: true })
  public description?: string;

  @Field({ nullable: true })
  public icon?: string;

  @Field(() => [Resource], { defaultValue: [] })
  public resources: Resource[] = [];
}

export default ResourceType;
