import {
  Field, ID,
  ObjectType
} from '@nestjs/graphql';

import { IsEnum, IsNotEmpty, Matches, ValidateNested } from 'class-validator';
import { StateCodeAbbreviated } from 'constants/Patient.constants';
import { Type } from 'class-transformer';

@ObjectType()
export class OrderItem {
  @Field(() => ID)
  @IsNotEmpty()
  id: string;

  @Field(() => ID)
  @IsNotEmpty()
  orderId: string;

  @Field((_type) => Order)
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Order)
  order: Order;

  @Field(() => ID)
  @IsNotEmpty()
  clinicianId: string;

  @Field(() => ID, { nullable: true })
  rxId?: string;

  @Field(() => ID)
  @IsNotEmpty()
  statusId: number;

  @Field(() => ID, { nullable: true })
  previousStatusId?: number;

  @Field()
  @IsNotEmpty()
  updatedAt: Date;

  @Field()
  @IsNotEmpty()
  createdAt: Date;

  @Field()
  @IsNotEmpty()
  dueOn: Date;

  @Field({ nullable: true })
  priority?: number;

  @Field(() => ID)
  @IsNotEmpty()
  rxRegimenId: number;

  @Field(() => ID)
  @IsNotEmpty()
  rxProductId: number;

  @Field(() => ID, { nullable: true })
  mappedProductId?: string;

  @Field(() => ID, { nullable: true })
  dispensedProductId?: string;

  @Field({ nullable: true })
  insuranceIds?: string[];

  @Field({ nullable: true })
  isOTC?: boolean;
}

@ObjectType()
export class Order {

  @Field(() => ID)
  @IsNotEmpty()
  id: string;

  @Field(() => [OrderItem])
  orderItems: OrderItem[];

  @Field(() => ID)
  @IsNotEmpty()
  patientId: string;

  @Field(() => ID)
  @IsNotEmpty()
  clinicId: string;

  @Field({ nullable: true })
  brand?: string;

  @Field(() => ID)
  @IsNotEmpty()
  pharmacyId: string;

  @Field(() => ID, { nullable: true })
  orderBatchId: string;

  @Field(() => ID, { nullable: true })
  shippedAddressId: string;

  @Field(() => ID)
  @IsNotEmpty()
  statusId: string;

  @Field(() => ID, { nullable: true })
  previousStatusId: string;

  @Field()
  @IsNotEmpty()
  updatedAt: Date;

  @Field()
  @IsNotEmpty()
  createdAt: Date;

  @IsNotEmpty()
  dueOn: Date;

  @Field({ nullable: true })
  highestPriority?: number;

}

@ObjectType()
export class Clinic {

  @Field(() => ID)
  @IsNotEmpty()
  id: string;

  @Field()
  @IsNotEmpty()
  clinicDoseSpotId: string;

  @Field()
  @IsNotEmpty()
  clinicName: string;
}

@ObjectType()
export class Clinician {
  @Field(() => ID)
  @IsNotEmpty()
  id: string;

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

@ObjectType()
export class Pharmacy {
  @Field(() => ID)
  @IsNotEmpty()
  id: string;

  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  doseSpotId: string;
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

