import { registerAs } from '@nestjs/config';

import { isLocal } from '@thirtymadison/environment-utils';

import { LogLevel } from 'constants/Logger.constants';

const { LOG_LEVEL = LogLevel.info } = process.env;

const READACTED_HEADER_PATHS = [
  'req.headers.authorization',
  'req.headers.cookie',
  'res.headers["set-cookie"]',
];

export const getLoggerLevel = () => LOG_LEVEL;

export const getRedactedHeaderPaths = () => READACTED_HEADER_PATHS;

export const getUseLevelLabels = () => true;

export const getLoggerConfig = () => ({
  pinoHttp: {
    level: getLoggerLevel(),
    prettyPrint: isLocal(),
    redact: READACTED_HEADER_PATHS,
    useLevelLabels: getUseLevelLabels(),
  },
});

export default registerAs('logger', getLoggerConfig);
