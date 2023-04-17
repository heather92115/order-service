import { registerEnumType } from '@nestjs/graphql';

export enum Brand {
  Keeps = 'Keeps',
  Cove = 'Cove',
  Facet = 'Facet',
  Picnic = 'Picnic',
  NurxMentalHealth = 'NurxMentalHealth',
}

registerEnumType(Brand, {
  name: 'Brand',
  description: 'List of supported Treatment Brands',
});
