export const SearchPackagedDrugByNameQuery = `query SearchPackagedDrugByName($name: String!){
  packagedDrugs(name: $name){
    name
    code
    manufacturer
    doseForm
    amountValue
    amountUnit
    productType
    intendedRoute
    packagingUnit
    packagingValue
  }
}`;

export const SearchPackagedDrugByIdQuery = `query SearchPackagedDrugById($id: String!) {
    packagedDrugsById(id: $id){
      packagedDrugId
      name
      code
      manufacturer
      doseForm
      amountValue
      amountUnit
      productType
      intendedRoute
      packagingUnit
      packagingValue
    }
  }`;
