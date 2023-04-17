import { registerAs } from '@nestjs/config';

const {
  AWS_ACCESS_KEY_ID,
  AWS_ROLE = 'cube-staging',
  AWS_SECRET_ACCESS_KEY,
  AWS_STS_URL = 'https://sts.amazonaws.com/',
  VAULT_ADDR = 'https://vault.fortymadison.com',
  VAULT_PATH = 'kv/data/medication-treatment_service_staging',
  VAULT_TOKEN,
} = process.env;

export const getAWSAccessKeyId = () => AWS_ACCESS_KEY_ID;
export const getAWSRole = () => AWS_ROLE;
export const getAWSSecretAccessKey = () => AWS_SECRET_ACCESS_KEY;
export const getAWSSTSUrl = () => AWS_STS_URL;

export const getAWSConfig = () => ({
  accessKeyId: getAWSAccessKeyId(),
  role: AWS_ROLE,
  secretAccessKey: getAWSSecretAccessKey(),
  url: getAWSSTSUrl(),
});

export const getVaultAddress = () => VAULT_ADDR;
export const getVaultPath = () => VAULT_PATH;
export const getVaultToken = () => VAULT_TOKEN;

export const getVaultConfig = () => ({
  address: getVaultAddress(),
  aws: getAWSConfig(),
  path: getVaultPath(),
  token: getVaultToken(),
});

export default registerAs('vault', getVaultConfig);
