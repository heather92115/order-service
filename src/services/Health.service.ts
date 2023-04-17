import { Injectable } from '@nestjs/common';
import {
  HealthCheckResult,
  HealthCheckService,
  HealthIndicator,
} from '@nestjs/terminus';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class HealthService extends HealthIndicator {
  constructor(
    private readonly logger: PinoLogger,
    private readonly health: HealthCheckService,
  ) {
    super();
    this.logger.setContext(HealthService.name);
  }

  checkServiceHealth(): Promise<HealthCheckResult> {
    return this.health.check([]);
  }
}
