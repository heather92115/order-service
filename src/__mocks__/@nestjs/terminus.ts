import {
  HealthCheck,
  HealthCheckError,
  HealthCheckResult,
  HealthIndicator,
} from '@nestjs/terminus';

const healthCheckResult: HealthCheckResult = {
  details: {},
  error: {},
  info: {},
  status: 'ok',
};

export class HealthCheckService {
  check = jest.fn().mockReturnValue(healthCheckResult);
}

export { HealthCheck, HealthCheckError, HealthIndicator };
