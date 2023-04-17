import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { LoggerModule } from 'nestjs-pino';

import { HealthController } from 'controllers/Health.controller';
import { HealthService } from 'services/Health.service';

jest.mock('services/Health.service');

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      imports: [LoggerModule.forRoot()],
      providers: [ConfigService, HealthService],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  describe('getHealthCheck', () => {
    it('should return a health check result', async () => {
      const response = await controller.getHealthCheck();

      expect(response).toEqual({
        details: {},
        error: {},
        info: {},
        status: 'ok',
      });
    });
  });
});
