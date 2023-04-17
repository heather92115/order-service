export const AddTreatmentQuery = `
  mutation AddTreatment(
    $packagedDrug: AddMedicationInformationInput!
    $product: AddProductInput!
  ) {
    addTreatment(packagedDrug: $packagedDrug, product: $product) {
      id
      product {
        medplumId
        tmProduct {
          tmPlatformId
          careAppDrugType
          careAppDrugClass
        }
        nurxItem {
          itemId
          price
          priceUnitId
          counselTemplateCategoryId
          v2CashAllowed
          nurxDrugId
        }
      }
      medicationInformation {
        id
        ndc
        name
        status
      }
    }
  }
`;

export const AllTreatmentsQuery = `query {
  treatments {
    id
    product {
      medplumId
      tmProduct {
        tmPlatformId
        careAppDrugType
        careAppDrugClass
      }
      nurxItem {
        itemId
        price
        priceUnitId
        counselTemplateCategoryId
        v2CashAllowed
        nurxDrugId
      }
    }
    medicationInformation {
      id
      ndc
      name
      status
    }
  }
}`;

export const FindTreatmentQuery = `query findTreatment($id: String!) {
  treatment(id: $id) {
    id
    product {
      medplumId
      tmProduct {
        tmPlatformId
        careAppDrugType
        careAppDrugClass
      }
      nurxItem {
        itemId
        price
        priceUnitId
        counselTemplateCategoryId
        v2CashAllowed
        nurxDrugId
      }
    }
    medicationInformation {
      id
      ndc
      name
      status
    }
  }
}
`;
