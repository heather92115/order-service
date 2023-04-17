import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { LoggerModule } from 'nestjs-pino';

import { AppController } from '../../../src/controllers/App.controller';

describe('AppController', () => {
  let controller: AppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      imports: [LoggerModule.forRoot()],
      providers: [ConfigService],
    }).compile();

    controller = module.get<AppController>(AppController);
  });

  describe('getRobotsTxt', () => {
    it('should return a robots.txt file', async () => {
      const response = controller.getRobotsTxt();

      expect(response).toEqual('User-agent: *\nDisallow: /\n');
    });
  });
});
