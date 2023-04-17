import { registerAs } from '@nestjs/config';

import { getNodeEnv } from '@thirtymadison/environment-utils';

const { SENTRY_DSN } = process.env;

export const getSentryDSN = () => SENTRY_DSN;

export const getSentryConfig = () => ({
  dsn: getSentryDSN(),
  environment: getNodeEnv(),
});

export default registerAs('sentry', getSentryConfig);
