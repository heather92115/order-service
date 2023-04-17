import * as path from 'path';

import { registerAs } from '@nestjs/config';

const { PORT = 3049, TIMEOUT = '15s' } = process.env;

export const getAppHost = () => '0.0.0.0';
export const getAppPort = () => PORT;
export const getAppStaticFilesPath = () => path.join(process.cwd(), 'public');
export const getAppTimeout = () => TIMEOUT;

export const getAppConfig = () => ({
  host: getAppHost(),
  port: getAppPort(),
  staticFilesPath: getAppStaticFilesPath(),
  timeout: getAppTimeout(),
});

export default registerAs('app', getAppConfig);
