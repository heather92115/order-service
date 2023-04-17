import { name } from '../../package.json';

import {
  getKafkaClientId,
  getKafkaConsumerGroupId,
} from './KafkaClient.config';

jest.mock('config/Environment.config');

describe('KafkaClientConfig', () => {
  describe('getKafkaClientId', () => {
    it('should return a kafka client id', () => {
      expect(getKafkaClientId()).toBe(`${name}-test`);
    });
  });

  describe('getKafkaConsumerGroupId', () => {
    it('should return a kafka consumer group id', () => {
      expect(getKafkaConsumerGroupId()).toBe(`${name}-test`);
    });
  });
});
