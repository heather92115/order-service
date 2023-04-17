import { registerAs } from '@nestjs/config';

import {
  isLocal,
  isProduction,
  notIsProduction,
} from '@thirtymadison/environment-utils';

import { CustomPinoLogger } from 'loggers/Pino.logger';

import { getLoggerConfig } from './Logger.config';

export const getGraphQLSchemaFile = () => 'schema.gql';

const { GATEWAY_URL = 'http://localhost:3010/graphql' } = process.env;

export const getGatewayHost = () => GATEWAY_URL;

export const getGraphQLConfig = () => ({
  autoSchemaFile: getGraphQLSchemaFile(),
  debug: isLocal(),
  gatewayURL: GATEWAY_URL,
  installSubscriptionHandlers: false,
  logger: new CustomPinoLogger(getLoggerConfig()),
  playground: notIsProduction(),
  sortSchema: true,
  cors: getApolloServerCors(),
});

const getCorsOrigin = () => {
  if (isProduction()) {
    return [
      /fortymadison\.com$/,
      /thirtymadison\.com$/,
      /withcove\.com$/,
      /picnicallergy\.com$/,
      /kps\.co$/,
      /keeps\.com$/,
    ];
  } else {
    return true;
  }
};

const getApolloServerCors = () => ({
  credentials: true,
  origin: getCorsOrigin(),
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  maxAge: 600,
});

export default registerAs('graphQL', getGraphQLConfig);
