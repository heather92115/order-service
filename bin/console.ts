import * as repl from 'repl';

import { NestFactory } from '@nestjs/core';
import * as Logger from 'purdy';

import { AppModule } from '../src/App.module';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.exit = (code = 0) => process.exit(code);

const REPL_CONFIG = {
  ignoreUndefined: true,
  prompt: '> ',
  useColors: true,
  writer,
};
const LOGGER_CONFIG = {
  depth: 1,
  indent: 2,
};

init();

async function init() {
  const server = repl.start(REPL_CONFIG);

  server.context.app = await NestFactory.createApplicationContext(AppModule);
}

function writer(value): string {
  return Logger.stringify(value, LOGGER_CONFIG);
}
