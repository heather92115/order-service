import { Environment } from '@thirtymadison/environment-utils';

const STAGING_NAME = 'test';

export const getNodeEnv = jest.fn().mockReturnValue(Environment.test);

export const getStagingName = jest.fn().mockReturnValue(STAGING_NAME);

export const getStagingNameOrNodeEnv = jest.fn().mockReturnValue(STAGING_NAME);
