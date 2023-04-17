import { Field, ObjectType, ID, Directive, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ObjectType()
@Directive('@key(fields: "medplumId")')
export class Product {
  @Field(() => ID)
  @IsNotEmpty()
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  medplumId?: string;

  @Field({ nullable: true })
  upc?: string;

  @Field({ nullable: true })
  formattedNdc?: string;

  @Field({ nullable: true })
  doseForm?: string;

  @Field({ nullable: true })
  intendedRoute?: string;

  @Field(() => Int, { nullable: true })
  amountValue: number;

  @Field()
  amountUnit: string;

  @Field()
  packagingUnit: string;

  @Field(() => Int)
  packagingValue: number;
}
