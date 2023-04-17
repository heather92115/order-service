import { Brand } from 'enums/Brand.enum';
import { AddNurxItemInput } from 'models/Product/NurxItem.Input';
import { AddProductInput } from 'models/Product/Product.input';
import { AddTmProductInput } from 'models/Product/TmProduct.input';

export const NURX_ITEM_INPUT: AddNurxItemInput = {
  itemId: '',
  price: 5,
  priceUnitId: 'dollars',
  counselTemplateCategoryId: '5',
  v2CashAllowed: false,
  nurxDrugId: '6761',
};

export const TM_PRODUCT_INPUT: AddTmProductInput = {
  tmPlatformId: '',
  careAppDrugType: 'Prescription',
  careAppDrugClass: 'Prescription',
};

export const PRODUCT_INPUT: AddProductInput = {
  medplumId: '5e15fdbb-e2b3-4148-bc10-a7b47d523881',
  upc: '5e15fdbb-e2b3-4148-bc10-a7b47d523881',
  brands: [Brand.Keeps, Brand.NurxMentalHealth],
  tmProduct: TM_PRODUCT_INPUT,
  nurxItem: NURX_ITEM_INPUT,
};
