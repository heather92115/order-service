import { INestApplication } from '@nestjs/common';

import { AuthService } from '@thirtymadison/nestjs-auth';

import TreatmentManager from './TreatmentManager';

export default class UnauthorizedUser {
  public async authorizeAsTreatmentManager(
    app: INestApplication,
  ): Promise<TreatmentManager> {
    const authService: AuthService = await app.resolve(AuthService);
    const userToken = await authService.createTestDoctorAccessToken();
    return new TreatmentManager(app, userToken || '');
  }
}
