import { registerAs } from '@nestjs/config';

import { getNodeEnv, getStagingName } from '@thirtymadison/environment-utils';

export const getEnvConfig = () => ({
  env: getNodeEnv(),
  stagingName: getStagingName(),
});

export default registerAs('env', getEnvConfig);
