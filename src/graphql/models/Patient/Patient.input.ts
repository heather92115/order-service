import { ArgsType, Field, InputType } from '@nestjs/graphql';

import { IsEnum, IsNotEmpty, Matches, ValidateNested } from 'class-validator';
import { PatientDOB, StateCodeAbbreviated } from 'constants/Patient.constants';
import { Type } from 'class-transformer';

@InputType()
@ArgsType()
export class PatientInput {

  @Field({ nullable: true })
  doseSpotId?: string;

  @Field()
  @IsNotEmpty()
  firstName: string;

  @Field()
  @IsNotEmpty()
  lastName: string;

  /** Formatted as MM/dd/YYYY */
  @Field()
  @IsNotEmpty()
  dob: PatientDOB;

  @Field((_type) => AddressInput)
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => AddressInput)
  address: AddressInput;

  @Field((_type) => AddressInput, { nullable: true })
  @ValidateNested()
  @Type(() => AddressInput)
  alternateAddress?: AddressInput;

  @Field(() => [InsuranceInput], { nullable: true })
  @ValidateNested()
  insurances: InsuranceInput[];
}

@InputType()
@ArgsType()
export class InsuranceInput {

  @Field()
  cardholderFirstName: string;

  @Field()
  cardholderLastName: string;

  @Field()
  cardholderId: string;

  @Field()
  bin: string;

  @Field()
  pcn: string;

  @Field()
  groupNumber: string;

  @Field()
  relationshipCode: string;

  @Field()
  personCode: string;
}

@InputType()
@ArgsType()
export class AddressInput {

  @Field()
  @IsNotEmpty()
  streetAddress1: string;

  @Field({ nullable: true })
  streetAddress2?: string;

  @Field()
  @IsNotEmpty()
  city: string;

  @Field()
  @IsEnum(StateCodeAbbreviated)
  state: string;

  @Field()
  @IsNotEmpty()
  @Matches(/(^\d{5}$)|(^\d{5}-\d{4}$)/)
  zipCode: string;
}


