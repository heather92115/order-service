import { ArgsType, Field, ID, InputType, ObjectType } from '@nestjs/graphql';

import { IsEnum, IsNotEmpty, Matches, ValidateNested } from 'class-validator';
import { PatientDOB, StateCodeAbbreviated } from 'constants/Patient.constants';
import { Type } from 'class-transformer';

@ObjectType()
export class PatientInput {

  @Field(() => ID)
  @IsNotEmpty()
  id: string;

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

  @Field((_type) => Address)
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Address)
  address: Address;

  @Field((_type) => Address, { nullable: true })
  @ValidateNested()
  @Type(() => Address)
  alternateAddress?: Address;

  @Field({ nullable: true })
  insuranceIds?: string[];
}

@ObjectType()
export class Insurance {
  @Field(() => ID)
  @IsNotEmpty()
  id: string;

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

@ObjectType()
export class Address {

  @Field(() => ID)
  @IsNotEmpty()
  id: string;

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


