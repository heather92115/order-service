import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Pharmacy {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  doseSpotId: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}


