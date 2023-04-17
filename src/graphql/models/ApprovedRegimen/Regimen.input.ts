import { Field, ID, InputType, Int } from '@nestjs/graphql';

@InputType()
export class RegimenInput {

  @Field(() => Int)
  daysSupply: number;
}
