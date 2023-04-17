import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { LoggerModule } from 'nestjs-pino';
import * as request from 'supertest';

import { AppController } from 'controllers/App.controller';

describe('AppController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      imports: [LoggerModule.forRoot()],
    }).compile();

    app = moduleFixture.createNestApplication(undefined, { logger: false });

    await app.init();
  });
  afterAll(() => app.close());

  it('/robots.txt (GET)', () => {
    return request(app.getHttpServer())
      .get('/robots.txt')
      .expect(200)
      .expect('User-agent: *\nDisallow: /\n');
  });
});
