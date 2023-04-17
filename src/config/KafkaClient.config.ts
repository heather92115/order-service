import { registerAs } from '@nestjs/config';
import { SASLOptions } from 'kafkajs';

import {
  getStagingNameOrNodeEnv,
  isUpperEnv,
} from '@thirtymadison/environment-utils';

import { name } from '../../package.json';

const {
  BROKER_CONNECTION_STRING = 'localhost:9092',
  KAFKA_CLIENT_LOG_LEVEL = '1',
} = process.env;

export const getKafkaRetries = () => ({
  retries: 25,
});

export const getKafkaClientBrokers = () => BROKER_CONNECTION_STRING.split(',');
export const getKafkaClientId = () => {
  return [name, getStagingNameOrNodeEnv()].join('-');
};
export const getKafkaClientLogLevel = () => +KAFKA_CLIENT_LOG_LEVEL;

export const getKafkaClientSsl = (): boolean => isUpperEnv();
export const getKafkaClientSasl = (): SASLOptions | undefined => {
  const { KAFKA_CLIENT_PASSWORD, KAFKA_CLIENT_USERNAME } = process.env;

  if (isUpperEnv() && KAFKA_CLIENT_USERNAME && KAFKA_CLIENT_PASSWORD) {
    return {
      mechanism: 'scram-sha-512',
      password: KAFKA_CLIENT_PASSWORD,
      username: KAFKA_CLIENT_USERNAME,
    };
  }

  return undefined;
};

export const getKafkaClientConfig = () => ({
  brokers: getKafkaClientBrokers(),
  clientId: getKafkaClientId(),
  // TODO: Re-enable this when the associated GitHub issue is resolved.
  // See: https://github.com/nestjs/nest/issues/6797.
  // logCreator: () => ({ namespace, level, log }) => void 0,
  logLevel: getKafkaClientLogLevel(),
  retry: getKafkaRetries(),
  sasl: getKafkaClientSasl(),
  ssl: getKafkaClientSsl(),
});

export const getKafkaConsumerGroupId = () => {
  return [name, getStagingNameOrNodeEnv()].join('-');
};

export const getKafkaConsumerConfig = () => ({
  groupId: getKafkaConsumerGroupId(),
});

export const getKafkaProducerAutoTopicCreation = () => true;

export const getKafkaProducerConfig = () => ({
  allowAutoTopicCreation: getKafkaProducerAutoTopicCreation(),
  retry: getKafkaRetries(),
});

export const getKafkaConfig = () => ({
  client: getKafkaClientConfig(),
  consumer: getKafkaConsumerConfig(),
  producer: getKafkaProducerConfig(),
});

export default registerAs('kafka', getKafkaConfig);
