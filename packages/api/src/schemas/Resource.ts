import { Field, ObjectType } from 'type-graphql';
import Document from './Document';
import ResourceField from './ResourceField';
import ResourceType from './ResourceType';

@ObjectType()
class Resource {
  @Field()
  public id: string = '';

  @Field()
  public typeId: string = '';

  @Field(() => ResourceType)
  public type: ResourceType = undefined as any;

  @Field()
  public name: string = '';

  @Field({ nullable: true })
  public description?: string;

  @Field({ nullable: true })
  public ref?: string;

  @Field({ nullable: true })
  public status?: string;

  @Field({ nullable: true })
  public assignedToId?: string;

  @Field(() => Resource, { nullable: true })
  public assignedTo?: Resource;

  @Field(() => [ResourceField])
  public fields?: ResourceField[];

  @Field(() => [Resource])
  public assignments: Resource[] = [];

  @Field(() => [Document])
  public documents: Document[] = [];

  @Field({ nullable: true })
  public acquisitionTime?: number;

  @Field({ nullable: true })
  public acquisitionPrice?: number;

  @Field({ nullable: true })
  public acquisitionCurrency?: string;

  @Field({ nullable: true })
  public totalPrice?: number;
}

export default Resource;
