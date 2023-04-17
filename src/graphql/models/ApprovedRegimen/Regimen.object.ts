import { Field, ObjectType, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class Regimen {
  @Field(() => ID)
  id: string;

  @Field(() => Int, {
    description:
      'The number of days the medication will last based upon usage prescribed by a provider.',
  })
  daysSupply: number;

  @Field()
  updatedAt: Date;

  @Field()
  createdAt: Date;
}
