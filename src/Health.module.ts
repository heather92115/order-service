import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

import { HealthController } from 'controllers/Health.controller';
import { HealthService } from 'services/Health.service';

@Module({
  controllers: [HealthController],
  imports: [TerminusModule],
  providers: [HealthService],
})
export class HealthModule {}
