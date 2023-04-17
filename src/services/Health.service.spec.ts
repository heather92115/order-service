import { ConfigService } from '@nestjs/config';
import { HealthCheckService } from '@nestjs/terminus';
import { Test, TestingModule } from '@nestjs/testing';
import { LoggerModule } from 'nestjs-pino';

import { KAFKA_CLIENT } from 'constants/KafkaClient.constants';

import { HealthService } from './Health.service';

describe('HealthService', () => {
  let health: HealthCheckService;
  let service: HealthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule.forRoot()],
      providers: [
        ConfigService,
        HealthCheckService,
        HealthService,
        {
          provide: KAFKA_CLIENT,
          useFactory: () => ({
            emit: jest.fn(() => ({
              toPromise: jest.fn(),
            })),
          }),
        },
      ],
    }).compile();

    health = module.get<HealthCheckService>(HealthCheckService);
    service = module.get<HealthService>(HealthService);
  });

  describe('checkServiceHealth', () => {
    it('should return a health check result', async () => {
      const healthCheckResult = await service.checkServiceHealth();

      expect(healthCheckResult).toEqual({
        details: {},
        error: {},
        info: {},
        status: 'ok',
      });
      expect(health.check).toHaveBeenCalledTimes(1);
      expect(health.check).toHaveBeenLastCalledWith([]);
    });
  });
});
