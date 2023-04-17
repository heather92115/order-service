import { LoggerService } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';

export class CustomPinoLogger extends PinoLogger implements LoggerService {
  log(msg, ...args) {
    super.info(msg, ...args);
  }
}
