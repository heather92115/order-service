import { Controller, Get } from '@nestjs/common';
import { HealthCheck } from '@nestjs/terminus';
import { PinoLogger } from 'nestjs-pino';

import { HealthService } from 'services/Health.service';

@Controller()
export class HealthController {
  constructor(
    private readonly logger: PinoLogger,
    private readonly healthService: HealthService,
  ) {
    this.logger.setContext(HealthController.name);
  }

  @Get('health[-_]?(check)?')
  @HealthCheck()
  async getHealthCheck() {
    return this.healthService.checkServiceHealth();
  }
}
