import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MedicationInformation {
  @Field(() => ID)
  id: string;

  @Field()
  ndc: string;

  @Field()
  name: string;

  @Field()
  status: string;

  @Field()
  doseForm: string;

  @Field()
  intendedRoute: string;

  @Field(() => Int)
  amountValue: number;

  @Field()
  amountUnit: string;

  @Field(() => Int)
  packagingValue: number;

  @Field()
  packagingUnit: string;
}
