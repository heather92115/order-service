import * as fs from 'fs';
import * as path from 'path';

import { Controller, Get, Header } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';

import { getAppStaticFilesPath } from 'config/App.config';

// NOTE: The in-built `ServeStaticModule` clobbers the GraphQL playground, so we
// use this in its place. Consider using the `ServeStaticModule` in production.
// See: https://docs.nestjs.com/recipes/serve-static
const staticFilesPath = getAppStaticFilesPath();
const robotsTxt = fs.readFileSync(
  path.join(staticFilesPath, 'robots.txt'),
  'utf-8',
);

@Controller()
export class AppController {
  constructor(private readonly logger: PinoLogger) {
    this.logger.setContext(AppController.name);
  }

  @Get('robots.txt')
  @Header('Content-Type', 'text/plain')
  getRobotsTxt() {
    return robotsTxt;
  }
}
