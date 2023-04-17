import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class MedicationInformationInput {

  @Field({nullable: true})
  medplumId?: string;

  @Field()
  @IsNotEmpty()
  name: string;

  @Field({ nullable: true })
  formattedNdc?: string;

  @Field({ nullable: true })
  upc?: string;

  @Field({ nullable: true })
  doseForm?: string;

  @Field(() => Int)
  @IsNotEmpty()
  amountValue: number;

  @Field()
  @IsNotEmpty()
  amountUnit: string;

  @Field({ nullable: true })
  intendedRoute?: string;

  @Field()
  @IsNotEmpty()
  packagingUnit: string;

  @Field(() => Int)
  @IsNotEmpty()
  packagingValue: number;
}
