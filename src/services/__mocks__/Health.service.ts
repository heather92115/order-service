import { HealthCheckResult } from '@nestjs/terminus';

const healthCheckResult: HealthCheckResult = {
  details: {},
  error: {},
  info: {},
  status: 'ok',
};

export class HealthService {
  checkServiceHealth = jest.fn().mockResolvedValue(healthCheckResult);
}
