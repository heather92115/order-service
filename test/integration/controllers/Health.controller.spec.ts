import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { TerminusModule } from '@nestjs/terminus';
import { Test, TestingModule } from '@nestjs/testing';
import { LoggerModule } from 'nestjs-pino';
import * as request from 'supertest';

import KafkaClientConfig, { getKafkaConfig } from 'config/KafkaClient.config';
import { HealthController } from 'controllers/Health.controller';
import { KafkaTestClientModule } from 'helpers/KafkaClient.module';
import { HealthService } from 'services/Health.service';

describe('HealthConroller', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      imports: [
        ConfigModule.forRoot({ load: [KafkaClientConfig] }),
        LoggerModule.forRoot(),
        TerminusModule,
        KafkaTestClientModule,
      ],
      providers: [HealthService],
    }).compile();

    app = moduleFixture.createNestApplication(undefined, { logger: false });

    await app.init();
  });
  afterAll(() => app.close());

  /*
   * TODO: This test currently triggers some unusual errors in the test runs:
   *
   * ReferenceError: You are trying to `import` a file after the Jest
   * environment has been torn down.
   * at 3 (node_modules/kafkajs/src/protocol/requests/leaveGroup/index.js:28:22)
   * at Broker.leaveGroup (node_modules/kafkajs/src/broker/index.js:422:45)
   * at ConsumerGroup.leave (node_modules/kafkajs/src/consumer/consumerGroup.js:147:30)
   * at Runner.stop (node_modules/kafkajs/src/consumer/runner.js:123:32)
   *
   * This appears to be an issue internal to KafkaJS and it should be fixed in a
   * future release. Determine if upgrading to `@nestjs/microservices@>=8` fixes
   * the problem.
   */
  describe.skip('getHealthCheck', () => {
    beforeAll(async () => {
      app.connectMicroservice({
        options: getKafkaConfig(),
        transport: Transport.KAFKA,
      });

      await app.startAllMicroservicesAsync();
    });

    it.each(['health', 'healthcheck', 'health-check', 'health_check'])(
      '/health (GET)',
      (path) => {
        return request(app.getHttpServer())
          .get(`/${path}`)
          .expect(200)
          .expect({
            details: { kafka: { status: 'up' } },
            error: {},
            info: { kafka: { status: 'up' } },
            status: 'ok',
          });
      },
    );
  });
});
