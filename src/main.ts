import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as Sentry from '@sentry/node';
import * as timeout from 'connect-timeout';
import helmet from 'helmet';

import { isProduction, notIsLocal } from '@thirtymadison/environment-utils';

import { getAppHost, getAppPort, getAppTimeout } from 'config/App.config';
import { getLoggerConfig } from 'config/Logger.config';
import { getSentryConfig } from 'config/Sentry.config';
import { SentryInterceptor } from 'interceptors/Sentry.interceptor';
import { CustomPinoLogger } from 'loggers/Pino.logger';

import { AppModule } from './App.module';

bootstrap();

async function bootstrap() {
  const logger = new CustomPinoLogger(getLoggerConfig());
  const app = await NestFactory.create(AppModule, { logger });
  const validationPipe = new ValidationPipe({
    forbidNonWhitelisted: true,
    transform: true,
  });

  if (isProduction()) {
    // NOTE: Only use helmet in production because it does not play nicely
    // with graphql playground.
    app.use(helmet());
    app.use(timeout(getAppTimeout()));
    app.use((req, _, next) => !req.timedout && next());
  }

  // NOTE: Only instrument Sentry in staging, demo, and production.
  if (notIsLocal()) {
    Sentry.init(getSentryConfig());
    app.useGlobalInterceptors(new SentryInterceptor());
  }

  // NOTE: Prevents the user from sending extra information alongside requests.
  app.useGlobalPipes(validationPipe);

  try {
    await app.listen(getAppPort(), getAppHost());
  } catch (e) {
    logger.error(e);

    // NOTE: This does not play nicely with the watcher. The watcher
    // keeps the process open despite calling exit. This seems helpful
    // rather than harmful and for now we should leave it as-is.
    process.exit(1);
  }
}
