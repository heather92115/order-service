import { NestFactory } from '@nestjs/core';

import { AppModule } from '../src/App.module';
import { getLoggerConfig } from '../src/config/Logger.config';
import { CustomPinoLogger } from '../src/loggers/Pino.logger';

init();

async function init() {
  const logger = new CustomPinoLogger(getLoggerConfig());
  const app = await NestFactory.create(AppModule, { logger }); // eslint-disable-line

  // Do what you want here...

  debugger;
}
