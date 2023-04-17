import { MedicationKnowledgePackagedDrug } from 'models/PackagedDrug/PackagedDrug.object';

export class DrugDatabaseServiceMock {
  /**
   * @param searchText Typically a drug name
   * @returns An array of PackagedDrugs
   *
   * TODO: WIP - need a better factory and multiple item return
   */
  public async searchPackagedDrugsByName(
    searchText: string,
  ): Promise<MedicationKnowledgePackagedDrug[]> {
    const pd = new MedicationKnowledgePackagedDrug();
    pd.manufacturer = searchText;
    pd.doseForm = 'foo';
    pd.amountValue = '30';
    pd.amountUnit = 'foo';
    pd.productType = 'foo';
    pd.name = 'tretinoin 0.05 % topical gel';
    pd.code = 'foo';
    pd.intendedRoute = 'foo';
    pd.packagingUnit = 'foo';
    pd.packagingValue = '1';

    return [pd];
  }

  public async searchPackagedDrugsById(
    id: string,
  ): Promise<MedicationKnowledgePackagedDrug> {
    const pd = new MedicationKnowledgePackagedDrug();
    pd.manufacturer = 'foo';
    pd.doseForm = 'foo';
    pd.amountValue = '30';
    pd.amountUnit = 'foo';
    pd.productType = 'foo';
    pd.name = 'tretinoin 0.05 % topical gel';
    pd.code = id;
    pd.intendedRoute = 'foo';
    pd.packagingUnit = 'foo';
    pd.packagingValue = '1';
    pd.packagedDrugId = id;

    return pd;
  }
}
