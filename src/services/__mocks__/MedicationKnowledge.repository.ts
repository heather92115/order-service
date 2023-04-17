import { plainToInstance } from 'class-transformer';
import { v4 as uuid } from 'uuid';

import { AddMedicationInformationInput } from 'models/MedicationInformation/MedicationInformation.input';
import { MedicationInformation } from 'models/MedicationInformation/MedicationInformation.object';
import {
  createInformationFromMedicationKnowledge,
  createMedicationKnowledgeFromInformation,
} from 'repositories/MedicationInformation/MedicationInformation.adapter';

export default class MedicationKnowledgeRepositoryFake {
  private readonly medKnowledges = new Map();

  public async createMedicationKnowledge(
    packagedDrug: AddMedicationInformationInput,
  ): Promise<MedicationInformation> {
    const medicationInformation = plainToInstance(
      MedicationInformation,
      packagedDrug,
    );
    medicationInformation.ndc = packagedDrug.code;
    const medicationKnowledge = createMedicationKnowledgeFromInformation(
      medicationInformation,
    );
    medicationKnowledge.id = uuid();
    this.medKnowledges.set(medicationKnowledge.id, medicationKnowledge);

    return createInformationFromMedicationKnowledge(medicationKnowledge);
  }

  public async getMedicationKnowledge(
    id: string,
  ): Promise<MedicationInformation> {
    return createInformationFromMedicationKnowledge(this.medKnowledges.get(id));
  }
}
