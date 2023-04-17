import {
  ArgsType,
  Field, ID,
  InputType,
} from '@nestjs/graphql';

import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import {
  PatientInput
} from 'models/Patient/Patient.input';
import {
  RegimenInput
} from 'models/ApprovedRegimen/Regimen.input';
import { ProductInput } from 'models/Product/Product.input';
import { PharmacyInput } from 'models/Pharmacy/Pharmacy.input';

@InputType()
@ArgsType()
export class OrderItemInput {

  @Field(() => ID, { nullable: true })
  clinicianId?: string;

  @Field((_type) => ClinicianInput, { nullable: true })
  @ValidateNested()
  @Type(() => ClinicianInput)
  clinician?: ClinicianInput;

  @Field((_type) => RegimenInput)
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => RegimenInput)
  rxRegimen: RegimenInput;

  @Field(() => ID, { nullable: true })
  rxProductId?: string;

  @Field((_type) => ProductInput, { nullable: true })
  @ValidateNested()
  @Type(() => ProductInput)
  rxProduct?: ProductInput;

  @Field(() => ID, { nullable: true })
  mappedProductId?: string;

  @Field((_type) => ProductInput, { nullable: true })
  @ValidateNested()
  @Type(() => ProductInput)
  mappedProduct?: ProductInput;

  @Field({ nullable: true })
  insuranceIds?: string[];

  @Field({ nullable: true })
  isOTC?: boolean;

  @Field({ nullable: true })
  priority?: number;
}

@InputType()
@ArgsType()
export class OrderInput {

  @Field(() => ID, { nullable: true })
  patientId?: string;

  @Field((_type) => PatientInput, { nullable: true })
  @ValidateNested()
  @Type(() => PatientInput)
  patient?: PatientInput;

  @Field({ nullable: true })
  brand?: string;

  @Field(() => ID, { nullable: true })
  clinicId?: string;

  @Field((_type) => ClinicInput, { nullable: true })
  @ValidateNested()
  @Type(() => ClinicInput)
  clinic?: ClinicInput;

  @Field(() => ID, { nullable: true })
  pharmacyId?: string;

  @Field((_type) => PharmacyInput, { nullable: true })
  @ValidateNested()
  @Type(() => PharmacyInput)
  pharmacy?: PharmacyInput;

  @Field(() => [OrderItemInput])
  items: OrderItemInput[];
}

@InputType()
@ArgsType()
export class ClinicInput {

  @Field()
  @IsNotEmpty()
  clinicDoseSpotId: string;

  @Field()
  @IsNotEmpty()
  clinicName: string;
}

@InputType()
@ArgsType()
export class ClinicianInput {

  @Field()
  @IsNotEmpty()
  doseSpotId: string;

  @Field({ nullable: true })
  prefix?: string;

  @Field()
  @IsNotEmpty()
  firstName: string;

  @Field()
  @IsNotEmpty()
  lastName: string;

  @Field({ nullable: true })
  suffix?: string;
}
