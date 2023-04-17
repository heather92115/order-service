import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PACKAGED_DRUG } from 'test/__fixtures__/PackagedDrug.fixture';
import {
  SearchPackagedDrugByIdQuery,
  SearchPackagedDrugByNameQuery,
} from 'test/queries/PackagedDrug.query';
import {
  AddTreatmentQuery,
  AllTreatmentsQuery,
  FindTreatmentQuery,
} from 'test/queries/Treatment.query';

import { AddMedicationInformationInput } from 'models/MedicationInformation/MedicationInformation.input';
import { MedicationKnowledgePackagedDrug } from 'models/PackagedDrug/PackagedDrug.object';
import { AddProductInput } from 'models/Product/Product.input';
import { Treatment } from 'models/Treatment/Treatment.object';

export default class TreatmentManager {
  private app: INestApplication;
  private userToken: string;

  constructor(app: INestApplication, userToken: string) {
    this.app = app;
    this.userToken = userToken;
  }

  public async addsTreatment(
    packagedDrug: MedicationKnowledgePackagedDrug,
    productInput: AddProductInput,
  ) {
    const packagedDrugInput = new AddMedicationInformationInput();
    packagedDrugInput.name = packagedDrug.name;
    packagedDrugInput.code = packagedDrug.code;
    packagedDrugInput.manufacturer = packagedDrug.manufacturer;
    packagedDrugInput.doseForm = packagedDrug.doseForm;
    packagedDrugInput.amountValue = parseInt(packagedDrug.amountValue);
    packagedDrugInput.amountUnit = packagedDrug.amountUnit;
    packagedDrugInput.productType = packagedDrug.productType;
    packagedDrugInput.intendedRoute = packagedDrug.intendedRoute;
    packagedDrugInput.packagingValue = parseInt(packagedDrug.packagingValue);
    packagedDrugInput.packagingUnit = packagedDrug.packagingUnit;

    const result = await request(this.app.getHttpServer())
      .post('/graphql')
      .set('Authorization', 'Bearer ' + this.userToken)
      .set('x-scope', 'test')
      .set('x-token', this.userToken)
      .send({
        query: AddTreatmentQuery,
        variables: {
          packagedDrug: packagedDrugInput,
          product: productInput,
        },
      });

    expect(result).not.toBeUndefined();
    expect(result.statusCode).toBe(200);
    expect(result.body).not.toBeUndefined();
    expect(result.body.data).not.toBeNull();

    const treatment: Treatment = result.body.data.addTreatment;
    expect(treatment).not.toBeUndefined();
    expect(treatment.medicationInformation).not.toBeUndefined();
    expect(treatment.product).not.toBeUndefined();

    expect(treatment.id).toBe(treatment.product.medplumId);
    expect(treatment.id).toBe(treatment.medicationInformation.id);

    return treatment;
  }

  public async findsTreatmentInList(treatment: Treatment): Promise<Treatment> {
    const result = await request(this.app.getHttpServer())
      .post('/graphql')
      .set('x-scope', 'test')
      .set('Authorization', 'Bearer ' + this.userToken)
      .send({
        query: AllTreatmentsQuery,
      });

    expect(result).not.toBeUndefined();
    expect(result.statusCode).toBe(200);
    expect(result.body).not.toBeUndefined();

    const treatments: Treatment[] = result.body.data.treatments;
    const foundTreatments = treatments.filter(
      (treat) => treat.id === treatment.id,
    );

    expect(foundTreatments.length).toBe(1);

    const foundTreatment = foundTreatments[0];
    expect(foundTreatment.product.nurxItem.itemId).toBe(
      treatment.product.nurxItem.itemId,
    );
    expect(foundTreatment.product.tmProduct.tmPlatformId).toBe(
      treatment.product.tmProduct.tmPlatformId,
    );

    return foundTreatment;
  }

  public async transitionToTreatmentOverview(
    treatment: Treatment,
  ): Promise<Treatment> {
    const result = await request(this.app.getHttpServer())
      .post('/graphql')
      .set('x-scope', 'test')
      .set('Authorization', 'Bearer ' + this.userToken)
      .send({
        query: FindTreatmentQuery,
        variables: {
          id: treatment.id,
        },
      });

    expect(result).not.toBeUndefined();
    expect(result.statusCode).toBe(200);
    expect(result.body).not.toBeUndefined();

    const foundTreatment: Treatment = result.body.data.treatment;

    expect(foundTreatment.id).toBe(treatment.id);
    expect(foundTreatment.product.nurxItem.itemId).toBe(
      treatment.product.nurxItem.itemId,
    );
    expect(foundTreatment.product.tmProduct.tmPlatformId).toBe(
      treatment.product.tmProduct.tmPlatformId,
    );

    return foundTreatment;
  }

  public async searchPackagedDrugByName(drugName: string) {
    const result = await request(this.app.getHttpServer())
      .post('/graphql')
      .set('x-scope', 'test')
      .set('Authorization', 'Bearer ' + this.userToken)
      .send({
        query: SearchPackagedDrugByNameQuery,
        variables: {
          name: drugName,
        },
      });

    expect(result).not.toBeUndefined();
    expect(result.statusCode).toBe(200);
    expect(result.body).not.toBeUndefined();
    expect(result.body).not.toBeUndefined();

    const packagedDrugs = result.body.data.packagedDrugs;
    const filteredPackagedDrugs = packagedDrugs.filter(function filterIn(
      el: MedicationKnowledgePackagedDrug,
    ) {
      return el.name.includes(drugName);
    });

    expect(filteredPackagedDrugs).toHaveLength(packagedDrugs.length);

    return filteredPackagedDrugs[0];
  }

  public async searchPackagedDrugById(id: string) {
    const result = await request(this.app.getHttpServer())
      .post('/graphql')
      .set('x-scope', 'test')
      .set('Authorization', 'Bearer ' + this.userToken)
      .send({
        query: SearchPackagedDrugByIdQuery,
        variables: {
          id: id,
        },
      });

    expect(result).not.toBeUndefined();
    expect(result.statusCode).toBe(200);
    expect(result.body).not.toBeUndefined();
    expect(result.body).not.toBeUndefined();
    const packagedDrug = result.body.data.packagedDrugsById;

    expect(packagedDrug).toEqual(PACKAGED_DRUG);

    return packagedDrug;
  }
}
