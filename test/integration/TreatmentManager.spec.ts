import { INestApplication } from '@nestjs/common';
import { PACKAGED_DRUG } from 'test/__fixtures__/PackagedDrug.fixture';
import { PRODUCT_INPUT } from 'test/__fixtures__/ProductInput.fixture';
import { v4 as uuid } from 'uuid';

import { MedicationKnowledgePackagedDrug } from 'models/PackagedDrug/PackagedDrug.object';
import { Treatment } from 'models/Treatment/Treatment.object';

import { createAppModule } from './App.testmodule';
import TreatmentManager from './users/TreatmentManager';
import UnauthorizedUser from './users/UnauthorizedUser';

describe('Given: a Treatment Manager has a Medication', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createAppModule();
    expect(app).not.toBeNull();
    expect(app).not.toBeUndefined();
  });

  beforeEach(() => {
    PRODUCT_INPUT.nurxItem.itemId = uuid();
    PRODUCT_INPUT.tmProduct.tmPlatformId = uuid();
  });

  // afterAll(() => app.close());

  it('When: they add it to the Treatment Service then the Treatment Manager is notified of success And: the Product is seen in the Treatment Service by Name', async () => {
    const unauthorizedUser: UnauthorizedUser = new UnauthorizedUser();
    const treatmentManager: TreatmentManager =
      await unauthorizedUser.authorizeAsTreatmentManager(app);

    const packagedDrug: MedicationKnowledgePackagedDrug =
      await treatmentManager.searchPackagedDrugByName(PACKAGED_DRUG.name);

    const treatment: Treatment = await treatmentManager.addsTreatment(
      packagedDrug,
      PRODUCT_INPUT,
    );

    const foundTreatment = await treatmentManager.findsTreatmentInList(
      treatment,
    );

    await treatmentManager.transitionToTreatmentOverview(foundTreatment);
  });

  it('When: they add it to the Treatment Service then the Treatment Manager is notified of success And: the Product is seen in the Treatment Service by Id', async () => {
    const unauthorizedUser: UnauthorizedUser = new UnauthorizedUser();
    const treatmentManager: TreatmentManager =
      await unauthorizedUser.authorizeAsTreatmentManager(app);

    const packagedDrug: MedicationKnowledgePackagedDrug =
      await treatmentManager.searchPackagedDrugById(PACKAGED_DRUG.code);

    const treatment: Treatment = await treatmentManager.addsTreatment(
      packagedDrug,
      PRODUCT_INPUT,
    );

    const foundTreatment = await treatmentManager.findsTreatmentInList(
      treatment,
    );
    await treatmentManager.transitionToTreatmentOverview(foundTreatment);
  });
});
